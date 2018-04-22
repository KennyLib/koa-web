const http = require('http')
const https = require('https')
const path = require('path')
const Koa = require('koa')
const static = require('koa-static')
const bodyparser = require('koa-bodyparser')
const render = require('koa-ejs')
const session = require('koa-session')
const passport = require('./config/passport')
const app = new Koa()
const _routes = require('./config/routes').routes
const router = require('./middleware/router')(_routes)


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
app.use(bodyparser())
app.use(session({}, app))

app.use(passport.initialize())
app.use(passport.session())

/**
 * 配置路由
 */
// _routes(router);
app.use(router.routes()).use(router.allowedMethods());
// // Require authentication for now
// app.use(function (ctx, next) {
//     if (ctx.isAuthenticated()) {
//         return next()
//     } else {
//         ctx.redirect('/')
//     }
// })

/**
 * 静态文件访问
 */
app.use(static(path.join(__dirname, '/disk')));


http.createServer(app.callback()).listen(3000);
https.createServer(app.callback()).listen(3001);