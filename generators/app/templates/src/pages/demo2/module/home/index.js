/**
 * @author dong.wang(hzwangdong5@corp.netease.com) 
 * @version 1.0 
 */
NEJ.define([
    'base/klass',
    'base/element',
    'util/template/tpl',
    'util/dispatcher/module',
    'pro/demo2/common/module'
],function(_k,_e,_t0,_t1,_m,_p,_o,_f,_r){
    // variable declaration
    var _pro;
    /**
     * 项目模块基类对象
     * @class   {_$$ModuleHome}
     * @extends {_$$Module}
     * @param   {Object}  可选配置参数，已处理参数列表如下所示
     */
    _p._$$ModuleHome = _k._$klass();
    _pro = _p._$$ModuleHome._$extend(_m._$$Module);

     /**
     * 构建模块
     * @return {Void}
     */
    _pro.__doBuild = function(){
        this.__body = _e._$html2node(
            _t0._$getTextTemplate('home')
        );
    };

    // notify dispatcher
    _t1._$regist('home',_p._$$ModuleHome);
});