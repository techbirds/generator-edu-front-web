/**
 * @author dong.wang(hzwangdong5@corp.netease.com) 
 * @version 1.0 
 */
NEJ.define([
    'pro/demo1/common/module',
    'pro/demo1/common/component',
    'regular!./index.html',
    'text!./index.css'
], function (baseModule, baseComponent, template, css) {
    var Component = baseComponent.$extends({
        template: template,
        css: css
    });
    return baseModule.$regist(Component);
});