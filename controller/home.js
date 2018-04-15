const usersdao = require('../dao/usersdao');
const _home = async (ctx, next) => {
    ctx.state = {
        session: ctx.session,
        title: 'koa-web'
    };

    const viewobj = {};
    usersdao(function (err, rows) {
        viewobj.usersls = rows;
    });
    await next();

    console.info(viewobj);
    await ctx.render('index', viewobj);
};

module.exports = _home;
