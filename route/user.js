var express = require('express')
var route = express.Router()
var model = require('../model/schema').model
var mongo = require('../model/mongo').mongoUse

route.get('/', function (req, res) {
  res.send('This is the user API')
})

// 通过成员id或者社团部门获取成员
// route.get('/user', function (req, res) {
//   var message = {
//     user_id: 1,
//     community: {}
//   }
//   if (typeof req.query.user_id === 'undefined') {
//     message.community = req.query.community
//     delete message.user_id
//   } else if (typeof req.query.community === 'undefined') {
//     message.user_id = +req.query.user_id
//     delete message.community
//   }
//   console.log('the message is ' + JSON.stringify(message))
//   mongo.search(model.User, message, function (err, result) {
//     err ? res.status(500).json(err) : res.json(result)
//   })
// })

// // 添加成员
// route.post('/user', function (req, res) {
//   mongo.add(new model['User'](req.body), function (err, result) {
//     err ? res.status(500).json(err) : res.json({message: "添加成员成功",user: result})
//   })
// })

// 成员登录
route.post('/login', function (req, res) {
  console.log(req.body)
  mongo.search(model.User, req.body, function (err, result) {
    if (err) {
      res.status(500).json(err)
    } else {
      result.length === 0 ? res.status(403).json({msg: '用户名或者密码错误', user: null}) : res.json({msg: '登录成功', user: result[0]})
    }
  })
})

// 修改密码
route.put('password', function (req, res) {
  if (req.query.password !== req.query.ensurepassword) {
    res.status(403).json('再次确认的密码和重新设置的密码不一样')
    res.end()
  }
  mongo.update(model.User, ({user_id: req.query.user_id}, {password: req.query.password}), function (err, result) {
    err ? res.json(err) : res.json({msg: '修改密码成功'})
  })
})

module.exports = route
