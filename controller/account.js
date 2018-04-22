const router = require('koa-router')();
const passport = require('../config/passport');
const uuidv1 = require('uuid/v1')
const account = require('../model/account').Account
const _ = {
    register_get: async (ctx, next) => {
        ctx.state = {
            session: ctx.session,
            title: 'koa-web'
        };
        const viewobj = {layout: false};

        await ctx.render('register', viewobj);
    },
    register_post: async (ctx, next) => {
        let accountNum = await account.Account.findAndCount({
            where: {
                [account.Op.or]: [{ account: ctx.request.body.account }, { email: ctx.request.body.email }]
            }
        })
        ctx.state = {
            session: ctx.session,
            title: 'koa-web'
        };

        if (accountNum.count == 0) {
            let res = await account.Account.create({
                account: ctx.request.body.account,
                email: ctx.request.body.email,
                password: ctx.request.body.password,
                identity: uuidv1()
            })
            await ctx.render('login', { data: {layout: false, user: true } })
        } else {
            await ctx.render('register', {
                error: {
                    message: '注册失败！'
                }
            })
        }
    },
    login_get: async (ctx, next) => {
        ctx.state = {
            session: ctx.session,
            title: 'koa-web'
        };
        const viewobj = { data: { layout: false, user: true } };

        await ctx.render('login', viewobj);
    },
    login_post: async (ctx, next) => {
        return passport.authenticate('local', {
            /**
             * 提交表单过程中，如果不做任何处理的的话可以通过配置属性来实现成功、失败时的重定向，此时不需要后面的回调ßß
             */
            // successRedirect: '/',
            // failureRedirect: '/login'
        }, async (err, user, info, status) => {
            ctx.state = {
                session: ctx.session,
                title: 'koa-web'
            };
            if (!user) {
                await ctx.render('login', {
                    data: {
                        status: status,
                        user: user,
                        info: info
                    }
                })
            } else {
                ctx.redirect('/')
            }
        })(ctx)
    },
    logout: async (ctx, next) => {
        await ctx.logout()
        ctx.redirect('/login')
    }
};

module.exports = _;