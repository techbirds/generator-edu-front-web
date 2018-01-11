/**
 * @author dong.wang(itechbirds@gmail.com) 
 * @version 1.0 
 */
"use strict";
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    argv = require('yargs').argv,
    colors = require('colors'),
    path = require('path'),
    pArr = Array.isArray(argv.p) ? argv.p : [argv.p],
    config = {
        srcPath: {
            'admin': './src/scss/admin/**/**',
            'scss': './src/scss/**/**/**',
            'lib': './src/javascript/lib/{component,module}-*/**/**',
            'js': './src/javascript/admin/**/**/**'
        },
        includePaths: [
            './src/scss/lib/',
            './src/scss/lib/res-base/',
            './src/scss/lib/res-base/scss/',
            "./src/scss",
            "./src/javascript/lib/edu-front-regularUI/src/scss",
            "./src/javascript/lib/edu-front-ui/src/scss",
            "./src/javascript/lib/component-button/src/",
            "./src/javascript/lib/component-input/src/",
            "./src/"
        ],
        outputPath: {
            'admin': './src/css/admin',
            'scss': './src/css',
            'lib': './src/javascript/lib',
            'js': './src/javascript/admin'
        }
    };

// scss    
gulp.task('scss', function () {
    pArr.forEach(function (item) {
        var srcPath = config.srcPath[item] || config.srcPath.all,
            outputPath = config.outputPath[item] || config.outputPath.all;
        return gulp.src(srcPath + "*.scss")
            .pipe(sass({
                    'outputStyle': 'nested',
                    'errLogToConsole': true,
                    'includePaths': config.includePaths
                })
                .on('error', sass.logError))
            .pipe(gulp.dest(outputPath));
    });
});

gulp.task('watch:scss', ['scss'] /*先运行一遍scss*/ , function () {
    //过滤掉无用参数值
    pArr = pArr.filter(function (item) {
        var filter = item in config.srcPath;
        if (!filter && typeof item !== 'undefined') {
            console.log('您传入的参数-p: ' + item + ' 有误');
        }
        return filter && item !== 'all';
    });

    if (!pArr.length) {
        pArr.push('all');
    }

    pArr.forEach(function (item) {
        var srcPath = config.srcPath[item] || config.srcPath.all,
            outputPath = config.outputPath[item] || config.outputPath.all;
        console.log('     ' + 'watching'.yellow + ' '  + srcPath.yellow +'*.scss'.yellow)
    });
    console.log('>>> Sass is watching for changes. Press Ctrl-C to stop.')

    pArr.forEach(function (item) {
        var srcPath = config.srcPath[item];
        var cssWatcher = gulp.watch(srcPath + "*.scss", ['scss']);
        cssWatcher.on('change', function (event) {
            let srcPath = ('.' + event.path.substr(__dirname.length));
            let outPath = srcPath.replace('.scss','.css');
            console.log('>>> Change detected to: ' + srcPath);
            console.log('     ' + 'write'.yellow + ' ' + outPath.yellow);
        });
    });
});

gulp.task('watch', ['watch:scss']);
gulp.task('default', ['watch:scss']);
