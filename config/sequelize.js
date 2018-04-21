const Sequelize = require('sequelize');
module.exports = () => {
    //return new Sequelize('mssql://sa:Xx521314@121.42.186.91/Users')
    return new Sequelize('sqlite:database.sqlite')
} 