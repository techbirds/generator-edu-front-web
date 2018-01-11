/**
 * @author dong.wang(hzwangdong5@corp.netease.com) 
 * @version 1.0 
 */

NEJ.define([
    'base/element',
], function (element) {
    var Component = Regular.extend({
        config: function () {
            this.supr();
        }
    });

    Component.$extends = function ext(options){
        // cache css text
        if(typeof options.css==='string'){
            var css = options.css.trim();
            if (!!css){
                element._$pushCSSText(options.css);
            }
            delete options.css;
        }
        // delegate extends api
        var Comp = this.extend(options);
        Comp.$extends = ext;
        return Comp;
    };

    return Component;
});