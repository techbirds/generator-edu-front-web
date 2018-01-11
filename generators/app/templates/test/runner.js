/* eslint-env node */

/**
 * Tests runner. It searches for the config file name in the provided folder and run nej-mocha with
 * the config file.
 * 
 * Usage: 
 * 
 * $ npm run test "folder_name" "config_file_name" --customConfigurationKey=value ...
 * 
 * [Required]                  "folder_name": The partial folder name to search for. Can only point to one folder, in the format of "xxxxx" or "xxxx/xxxx"
 * 
 * [Optional]             "config_file_name": The name of the config file used by nej-mocha, in the format of "xxxx.js" or "xxx.xxx.js". Default to "conf.js". 
 *                                            If no config file is found, a basic configuration will be created.
 * 
 * [Optional] customConfigurationKey=value: Override properties of the matched or created configuration object. Supports multiple properties. 
 *                                            For example: 
 *                                            npm run test folderName shouldBrowserClosed=false headless=false
 * 
 * @author Andy Zhou <hzzhouandi@corp.netease.com>
 */

var nejMocha = require('nej-mocha');
var glob = require('glob');
var path = require('path');
var _ = require('lodash');
var args = process.argv.slice(2);

var folderName = args[0];
var isConfigFileNameArgValid = args[1] && /\.js$/.test(args[1]);
var configFileName = isConfigFileNameArgValid && args[1] || 'conf.js';
var baseFolderPrefix = '**/src/**/';

var getConfigFilePattern = (folderName, configFileName) => `${baseFolderPrefix}${folderName}/**/${configFileName}`;
var getTestFolderPattern = (folderName) => `${baseFolderPrefix}${folderName}`;

if (!folderName) {
    throw new Error('Must supply a folder name');
}

var customConfigurationArgs = isConfigFileNameArgValid ? args.slice(2) : args.slice(1);
var customConfigurationMap = {};
if (customConfigurationArgs && customConfigurationArgs.length) {
    for (var i = 0, l = customConfigurationArgs.length, matched, key, value; i < l; i++) {
        matched = customConfigurationArgs[i].match(/(\w+)=(\w+)/);

        if (matched) {
            key = matched[1];
            value = matched[2];

            try {
                value = /^(true|false|\d+)$/.test(value) ? JSON.parse(value) : value;
            } catch (error) {
                throw new Error(`Invalid custom configuration value: ${value}`);
            }

            customConfigurationMap[key] = value;
        }
    }
}

// Normalize slashes
folderName = folderName.replace(/[/\\]+/g, '/');

var searchPattern = getConfigFilePattern(folderName, configFileName);

process.stdout.write(`Searching for ${searchPattern}`);
var writingInterval = setInterval(function () {
    process.stdout.write(`.`);
}, 500);

glob(searchPattern, function (err, configFilePathArr) {
    clearInterval(writingInterval);
    process.stdout.write(`\n\n`);

    if (err) {
        throw err;
    }

    var defaultConfig = {};
    var singleConfigFilePath;
    var singleConfigObject = {};

    if (!configFilePathArr || !configFilePathArr.length) {
        console.log(`Can not find ${configFileName} in ${folderName}, generating a default test configuration...`);
        console.log(' ');

        var testFolderPath = glob.sync(getTestFolderPattern(folderName));

        if (!testFolderPath || !testFolderPath.length) {
            throw new Error(`Can not find folder 'test' in ${folderName}`)
        } else {
            testFolderPath = testFolderPath[0];

            var testEntry = `./${testFolderPath}/**/**/*.spec.js`;

            defaultConfig = _.merge(require('./config/conf.base'), {
                entries: [
                    testEntry
                ]
            });

            console.log(`Ready to run ${testEntry}...`)
            console.log(' ');
        }

        singleConfigObject = defaultConfig;
    } else {
        configFilePathArr.forEach(path => {
            process.stdout.write(`Found config file: ${path}`);
            process.stdout.write(`\n\n`);
        });

        if (configFilePathArr.length > 1) {
            throw new Error(`Multiple config files are found for ${folderName}, please provide a more specific folder name, for example: xxxx/folderName/xxx`)
        } else if (configFilePathArr.length === 1) {
            singleConfigFilePath = configFilePathArr && configFilePathArr[0];
        }
        
        singleConfigObject = require(path.resolve(process.cwd(), singleConfigFilePath));
    }

    singleConfigObject = _.merge(singleConfigObject, customConfigurationMap);

    nejMocha.run({
        config: singleConfigObject
    }, function () {
        if (!nejMocha.userConfig || nejMocha.userConfig.shouldBrowserClosed) {
            process.exit(0);
        }
    });
});
