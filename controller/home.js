const usersdao = require('../dao/usersdao');
const account = require('../model/account').Account

const _home = async (ctx, next) => {
    ctx.state = {
        session: ctx.session,
        title: 'koa-web'
    };

    const viewobj = {};
    usersdao.sqliteSearch(function (err, rows) {
        viewobj.usersls = rows;
    });
    let accArr = await account.findAll()

    console.log(accArr)
    await next();

    console.info(viewobj);
    await ctx.render('index', viewobj);
};

module.exports = _home;
