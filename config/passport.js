// passport.js
const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy

const _account = require('../model/account').Account


// 序列化ctx.login()触发
passport.serializeUser((user, done) => {
  console.log('serializeUser: ', user)
  done(null, user)
})
// 反序列化（请求时，session中存在"passport":{"user":"1"}触发）
passport.deserializeUser(async (user, done) => {
  done(null, user)
})
// 提交数据(策略)
passport.use(new LocalStrategy({
  usernameField: 'account',
  passwordField: 'password'
}, async (username, password, done) => {
  console.log('LocalStrategy', username, password)
  let acco = await _account.Account.findOne({
    where: { [_account.Op.or]: [{ account: username }, { email: username }] }
  })
  console.log('LocalStrategy', acco)
  if (acco) {
    if (acco.password == password) {
      done(null, acco)
    } else {
      done(null, false, '密码不正确！')
    }
  } else {
    done(null, false, '用户名不正确！')
  }
  // done(err, user, info)
}))


module.exports = passport
