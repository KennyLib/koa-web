const router = require('koa-router')();
const _ = {
    login_get: async (ctx, next) => {
        ctx.state = {
            session: ctx.session,
            title: 'koa-web'
        };
        const viewobj = {};

        await ctx.render('login', viewobj);
    },
    login_post: async (ctx, next) => {

        console.log(ctx.request.body);
        ctx.redirect('/');
    }
};

module.exports = _;