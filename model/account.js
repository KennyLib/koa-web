const uuidv1 = require('uuid/v1')
const Sequelize = require('sequelize')
const sequelize = require('../config/sequelize')

const Account = sequelize().define('account', {
    account: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    identity: {
        type: Sequelize.STRING
    }
});

// force: true 如果表已经存在，将会丢弃表
Account.sync({ force: true }).then(() => {
    // 表已创建
    Account.create({
        account: 'Administrator',
        email: '614044401@qq.com',
        password: 'Xx521314',
        identity: uuidv1()
    });
});
module.exports.Account = {
    Op: Sequelize.Op,
    Account: Account
}
