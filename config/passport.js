// passport.js
const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy

const _account = require('../model/account').Account


// 序列化ctx.login()触发
passport.serializeUser(function (user, done) {
  console.log('serializeUser: ', user)
  done(null, user)
})
// 反序列化（请求时，session中存在"passport":{"user":"1"}触发）
passport.deserializeUser(async function (user, done) {
  done(null, user)
})
// 提交数据(策略)
passport.use(new LocalStrategy({
  usernameField: 'account',
  passwordField: 'password'
}, function (username, password, done) {
  console.log('LocalStrategy', username, password)
  let acco = _account.findOne({
    where: { account: username }
  })
  console.log(acco)
  if (acco) {
    done(null, acco)
  } else {
    done(null, acco)
  }
  // done(err, user, info)
}))


module.exports = passport
