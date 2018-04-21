const router = require('koa-router')();
const passport = require('../config/passport');
const _ = {
    login_get: async (ctx, next) => {
        ctx.state = {
            session: ctx.session,
            title: 'koa-web'
        };
        const viewobj = {};

        await ctx.render('login', viewobj);
    },
    login_post: passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    }),
    logout: async (ctx) => {
        ctx.logout()
        ctx.redirect('/login')
    }
};

module.exports = _;