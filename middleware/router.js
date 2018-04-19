const router = require('koa-router')()

const _ = (routes) => {
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
    return router;
}
module.exports = _;
