const account = require('../model/account').Account

const _home = async (ctx, next) => {
    ctx.state = {
        session: ctx.session,
        title: 'koa-web'
    };

    const viewobj = {};
    
    viewobj.usersls = await account.Account.findAll()

    await next();

    console.info(viewobj);
    await ctx.render('index', viewobj);
};

module.exports = _home;
