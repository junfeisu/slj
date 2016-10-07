var express = require('express')
var route = express.Router()
var relative = require('../model/relative')
var mongo = require('../model/mongo').mongoUse
var model = require('../model/schema').model
// var app = require('../app')
// var io = require('socket.io')(app)

// 这是话题API
route.get('/', function (req, res) {
  res.send("This is topic API")
})

// 获取所有话题API
route.get('/alltopic', function (req, res) {
  // var io = require('socket.io')(app)
  // io.on('connection', function (socket) {
  //   socket.emit('alltopic', function () {
  //     console.log('123')
  //   })
  // })
  mongo.search(model.Topic, {}, function (err, topic) {
    if (err) {
      res.json(err)
    } else {
      topic.length === 0 ? res.json(topic) : relative.getComment(topic, res)
    }
  })
})

// 获取单个话题API
route.get('/topic', function (req, res) {
  mongo.search(model.Topic, {topic_id: req.query.topic_id}, function (err, result) {
    if (err) {
      console.log('err is ' + JSON.stringify(err))
    }
    err ? res.send(err) : res.json(result)
  })
})

// 添加话题API
route.post('/topic', function (req, res) {
  console.log('123')
  mongo.add(new model['Topic'](req.body), function (err, result) {
    err ? res.status(500).json(err) : res.json({msg: "添加话题成功", topic:result})
  })
})

module.exports = route
