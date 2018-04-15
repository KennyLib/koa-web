const http = require('http'),
    https = require('https'),
    path = require('path'),
    Koa = require('koa'),
    static = require('koa-static'),
    render = require('koa-ejs'),
    app = new Koa(),
    _routes = require('./config/router.js');
/**
 * 设置模板
 */
render(app, {
    root: path.join(__dirname, 'views'),
    layout: '_layout',
    viewExt: 'ejs',
    cache: false,
    debug: true
});
/**
 * 配置路由
 */
// _routes(router);
app.use(_routes.routes()).use(_routes.allowedMethods());
/**
 * 静态文件访问
 */
app.use(static(path.join(__dirname, '/public')));


http.createServer(app.callback()).listen(3000);
https.createServer(app.callback()).listen(3001);