/**
 * @author dong.wang(hzwangdong5@corp.netease.com) 
 * @version 1.0 
 */
NEJ.define([
    'base/klass',
    'base/element',
    'base/event',
    'util/dispatcher/regularModule',
    'util/dispatcher/module',
], function (k, e, v, m, m1, exports, pro) {
    /**
     * 项目模块基类对象
     *
     * @class   module/module
     * @extends util/dispatcher/regularModule
     */
    var Module = k._$klass();
    pro = Module._$extend(m._$$RegularModule);

    /**
     * 构建Regular组件
     *
     * @protected
     * @method module:util/dispatcher/regularModule._$$RegularModule#__build
     * @return {Void}
     */
    pro.__build = function (config) {
        this.__super(config);
        this._$innerModule.__doPublishMessage = this.__doPublishMessage._$bind(this);
        this._$innerModule.__doSubscribeMessage = this.__doSubscribeMessage._$bind(this);
        this._$innerModule.__doUnsubscribeMessage = this.__doUnsubscribeMessage._$bind(this);
        this._$innerModule.parseUMIFromOpt = this.parseUMIFromOpt._$bind(this);
        this._$innerModule.setTitle = this.setTitle._$bind(this);

        //把export暴露出去
        this._$innerModule.__export = this.__export;

        if (this._$innerModule.__doBuild) {
            this._$innerModule.__doBuild(config);
        }
    };
    /**
     * 解析模块所在容器节点,如果没有父节点默认id为module-box的节点
     *
     * @protected
     * @method /module/Module#__doParseParent
     * @param  {Object} arg0 - 配置信息
     * @return {Node}      模块所在容器节点
     */
    pro.__doParseParent = function (_options) {
        return this.__super(_options) || e._$get('app');
    };

    /**
     * 取消订阅消息
     *
     * @protected
     * @method /module/module#__doUnsubscribeMessage
     * @param  {String}   arg0 - 目标模块的UMI
     * @param  {String}   arg1 - 消息类型
     * @param  {Function} arg2 - 消息处理回调
     * @return {Void}
     */
    pro.__doUnsubscribeMessage = function () {
        this.__dispatcher._$unsubscribe.apply(this.__dispatcher, arguments);
    };

    pro.setTitle = function (title) {
        this.__doSendMessage('/?/nav/', {
            title: title
        });
    };

    /**
     * 从地址中解析出UMI信息
     * @param  {Object}   arg0 - 配置信息
     * @return {String}   UMI信息
     */
    pro.parseUMIFromOpt = function (options) {
        var reg0 = /\?|#/,
            reg1 = /^\/m\//i;

        options = (options.input || {}).location || options || window.location;
        return (options.href || options.target).split(reg0)[0].replace(reg1, '/');
    };


    /**
     * 注册RegularModule
     *
     * @public
     * @method module:util/dispatcher/regularModule._$build
     * @param  {Regular} arg1 - Regular组件模块
     * @return {_$$RegularModule} RegularModule模块
     */
    exports.$regist = function (_$$InnerModule) {
        /**
         * Regular模块对象
         *
         * @class   {_$$OuterModule}
         * @extends {_$$RegularModule}
         */
        var _$$OuterModule = k._$klass();
        var _pro = _$$OuterModule._$extend(exports.Module);
        _pro.__init = function (options) {
            this._$$InnerModule = _$$InnerModule;
            this.__super(options);
        };

        return _$$OuterModule;
    };
    exports.Module = Module;
});