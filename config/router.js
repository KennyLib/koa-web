const router = require('koa-router')();
const routes = [
    { type: 'get', name: '/', action: require('../controller/home') },
    { type: 'get', name: '/login', action: require('../controller/account').login_get },
    { type: 'post', name: '/login', action: require('../controller/account').login_post },
    { type: 'get', name: '/about', action: require('../controller/about') },
]


routes.forEach((_route) => {
    if (_route.type == 'get') {
        router.get(_route.name, _route.action)
    }
    if (_route.type == 'post') {
        router.post(_route.name, _route.action)
    } if (_route.type == 'put') {
        router.put(_route.name, _route.action)
    }
    if (_route.type == 'delete') {
        router.delete(_route.name, _route.action)
    }
})

module.exports = router;
