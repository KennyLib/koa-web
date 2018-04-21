const http = require('http'),
    https = require('https'),
    path = require('path'),
    Koa = require('koa'),
    static = require('koa-static'),
    bodyparser = require('koa-bodyparser'),
    render = require('koa-ejs'),
    session = require('koa-session'),
    passport = require('./config/passport'),
    app = new Koa(),
    _routes = require('./config/routes').routes,
    router = require('./middleware/router')(_routes)

// 基础中间件
app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    console.log(`${ctx.method} ${ctx.status} ${ctx.url} - ${ms} ms`)
})
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

app.keys = ['521314']

/**
 * 引入koa-bodyparser 中间件
 */
app.use(bodyparser());
app.use(session({}, app))

app.use(passport.initialize())
app.use(passport.session())

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