const http = require('http'),
    https = require('https'),
    path = require('path'),
    Koa = require('koa'),
    static = require('koa-static'),
    bodyparser = require('koa-bodyparser'),
    render = require('koa-ejs'),
    session = require('koa-session'),
    passpoprt = require('koa-passport'),
    app = new Koa(),
    _routes = require('./config/routes').routes,
    router = require('./middleware/router')(_routes)
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
 * 引入koa-bodyparser 中间件
 */
app.use(bodyparser());


/**
 * 配置路由
 */
// _routes(router);
app.use(router.routes()).use(router.allowedMethods());
/**
 * 静态文件访问
 */
app.use(static(path.join(__dirname, '/public')));


http.createServer(app.callback()).listen(3000);
https.createServer(app.callback()).listen(3001);