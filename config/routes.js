module.exports.routes = [
    {
        type: 'get',
        name: '/',
        action: require('../controller/home')
    },
    {
        type: 'get',
        name: '/login',
        action: require('../controller/account').login_get
    },
    {
        type: 'post',
        name: '/login',
        action: require('../controller/account').login_post
    },
    {
        type: 'get',
        name: '/about',
        action: require('../controller/about')
    }
]
