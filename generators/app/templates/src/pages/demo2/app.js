/**
 * 参考自 https://github.com/genify/nej-demo
 * @author dong.wang(hzwangdong5@corp.netease.com) 
 * @version 1.0 
 */
NEJ.define([
    'util/dispatcher/dispatcher'
],function(_t){
    _t._$startup({
        rules:{
            rewrite:{
                '404':'/m/home/',
            },
            alias:{
                'layout':'/m',
                'home':'/m/home/'
            }
        },
        modules:{
            '/m':{
                module:'module/layout/index.html' 
            },
            '/m/home/':{
                module:'module/home/index.html'
            }
        },
        onbeforechange:function(_options){
            var _umi = _options.path||'';
            if (!!_umi&&
                  _umi.indexOf('/?')<0&&
                  _umi.indexOf('/m')<0)
                _options.path = '/m'+_umi;
        }
    });
});