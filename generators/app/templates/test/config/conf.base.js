/* eslint-env node */
"use strict";

module.exports = {
    globals: {
        CMPT: true
    },
    entries: [],
    mochaOptions: {
        timeout: 30000,
        reporter: 'spec',
        useColors: true
    },
    nejPathAliases: {
        "pro": "/src/javascript/",
        "eui": "/src/javascript/lib/edu-front-ui/src/js/",
        "rui": "/src/javascript/lib/edu-front-regularUI/src/js/",
        "eutil": "/src/javascript/common/util/",
        "pool": "/src/javascript/lib/",
        "test-util": '/test/util/'
    },
    testRunnerPort: 8004,
    shouldBrowserClosed: true,
    headless: true,
    scriptsToInject: [
        './src/javascript/lib/regularjs/dist/regular.js'
    ],
    coverage: true,
    coverageOptions: {
        reporters: [
            'text',
            "lcov"
        ]
    },
    inject: []
};
