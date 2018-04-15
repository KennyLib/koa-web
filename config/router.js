
const router = require('koa-router')();
const _controller = {
    home: require('../controller/home'),
    about: require('../controller/about')
};
router.get('/', _controller.home)
    .get('/about', _controller.about);

module.exports = router;
