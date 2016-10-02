var express = require('express')
var route = express.Router()
var mongo = require('../model/mongo').mongoUse
var model = require('../model/schema').model

route.get('/', function (req, res) {
  res.send("This is message API")
})

// 获取所有留言
route.get('/allmessage', function (req, res) {
  mongo.search(model.Message, {}, function (err, result) {
    err ? res.status(500).json(err) : res.json(result)
  })
})

// 获取单个留言
route.get('/message', function (req, res) {
  mongo.search(model.Message, {message_id: req.query.message_id}, function (err, result) {
    if (err) {
      console.log('err is ' + JSON.stringify(err))
    }
    err ? res.send(err) : res.json(result)
  })
})

// 添加留言
route.post('/message', function (req, res) {
  console.log(req.body)
  mongo.add(new model['Message'](req.body), function (err, result) {
    err ? res.status(500).json(err) : res.json({msg: "发布留言成功", message:result})
  })
})

module.exports = route