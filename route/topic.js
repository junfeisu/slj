var express = require('express')
var route = express.Router()
var mongo = require('../model/mongo').mongoUse
var model = require('../model/schema').model

route.get('/', function (req, res) {
  res.send("This is topic API")
})

// 获取所有话题
route.get('/alltopic', function (req, res) {
  mongo.search(model.Topic, {}, function (err, result) {
    err ? res.status(500).json(err) : res.json(result)
  })
})

// 获取单个话题
route.get('/topic', function (req, res) {
  mongo.search(model.Topic, {topic_id: req.query.topic_id}, function (err, result) {
    if (err) {
      console.log('err is ' + JSON.stringify(err))
    }
    err ? res.send(err) : res.json(result)
  })
})

// 添加话题
route.post('/topic', function (req, res) {
  mongo.add(new model['Topic'](req.body), function (err, result) {
    err ? res.status(500).json(err) : res.json({msg: "添加话题成功", topic:result})
  })
})

module.exports = route