var path = require('path');

module.exports = {
    /* 代理路由 */
    proxyRoutes: {
        "ALL /web/j/*": "http://www.icourse163.org",
        "ALL /dwr/call/plaincall/*": "http://www.icourse163.org",
    },
    /* 注入给页面的模型数据的服务器配置 */
    modelServer: {
        // 完整的主机地址，包括协议、主机名、端口
        host: 'http://www.icourse163.org',
        // 查询参数
        queries: {
            "format": "json"
        },
        // 自定义请求头
        headers: {},
        // path 可以是字符串，也可以是函数；默认不用传，即使用 host + 页面path + queries 的值
        // 如果是函数，则使用函数的返回值，传给函数的参数 options 是一个对象，它包含 host、path（页面的path）、queries、headers 等参数
        // 如果 path 的值为假值，则使用 host + 页面path + queries 的值；
        // 如果 path 的值是相对地址，则会在前面加上 host
        path: function (option) {
            "use strict";
            if ((/index\.htm/).test(option.path)) {
                return "/";
            } else {
                return false;
            }
        }
    }
};