/**
 * @author dong.wang(hzwangdong5@corp.netease.com) 
 * @version 1.0 
 */
NEJ.define([
    // 调度
    'util/dispatcher/dispatcher',
    // 模块
    'pro/demo1/module/layout/index',
    'pro/demo1/module/home/index',
], function (d, LayoutModule,ButtonModule) {
    d._$startup({
        rules: {
            rewrite: {
                '404': '/m/home/'
            },
            title: {}
        },
        modules: {
            '/m': LayoutModule,
            '/m/home/': ButtonModule,
        }
    });
});