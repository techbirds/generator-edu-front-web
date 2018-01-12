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
     * @class   {_$$ModuleLayoutSystem}
     * @extends {_$$Module}
     * @param   {Object}  可选配置参数，已处理参数列表如下所示
     */
    _p._$$ModuleLayoutSystem = _k._$klass();
    _pro = _p._$$ModuleLayoutSystem._$extend(_m._$$Module);
    /**
     * 解析模块所在容器节点
     * @param  {Object} 配置信息
     * @return {Node}   模块所在容器节点
     */
    _pro.__doParseParent = function(_options){
        return _e._$get('app');
    };
    /**
     * 构建模块
     * @return {Void}
     */
    _pro.__doBuild = function(){
        this.__body = _e._$html2node(
            _t0._$getTextTemplate('module-id-l0')
        );
        // 0 - module box
        var _list = _e._$getByClassName(this.__body,'view');
        this.__export = {
            parent:_list[0]
        };
    };
    // notify dispatcher
    _t1._$regist('layout',_p._$$ModuleLayoutSystem);
});