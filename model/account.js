const uuidv1 = require('uuid/v1')
const Sequelize = require('sequelize')
const sequelize = require('../config/sequelize')

const Account = sequelize().define('account', {
    account: {
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
    return Account.create({
        account: 'Administrator',
        password: 'Xx521314',
        identity: uuidv1()
    });
});
module.exports.Account = Account
