var express = require('express')
var route = express.Router()
var mongo = require('../model/mongo').mongoUse
var model = require('../model/schema').model

route.get('/', function (req, res) {
  res.send("This is comment API")
})

// 获取所有评论
route.get('/comment', function (req, res) {
  mongo.search(model.Comment, {}, function (err, result) {
    err ? res.status(500).json(err) : res.json(result)
  })
})

// 添加评论
route.post('/comment', function (req, res) {
  mongo.add(new model['Comment'](req.body), function (err, result) {
    console.log('result is' + JSON.stringify(result))
    err ? res.status(500).json(err) : res.json({msg: "评论成功", comment: result})
  })
})

module.exports = route