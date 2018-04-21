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

        return passport.authenticate('local',
            function (err, user, info, status) {
                ctx.body = { user, err, info, status }
                return ctx.login({ id: 1, username: 'admin', password: '123456' })
            })(ctx)
    }
};

module.exports = _;