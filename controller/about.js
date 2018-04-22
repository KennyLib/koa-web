const _about = async (ctx, next) => {
    ctx.state = {
        session: ctx.session,
        title: 'koa-web'
    };

    await ctx.render('about', {
        data:{ layout: true}
    });
};

module.exports = _about;
