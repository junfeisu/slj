var express = require('express')
var path = require('path')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var topic = require('./route/topic')
var user = require('./route/user')
var message = require('./route/message')
var comment = require('./route/comment')
var doc = require('./route/meta')
var cons = require('consolidate')
var app = express()
var mongoose = require('mongoose')
var model = require('./model/schema').model
var mongo = require('./model/mongo').mongoUse

// app.all('*', function(req, res, next) {  
//     res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080");  
//     res.header("Access-Control-Allow-Credentials", true);  
//     next();  
// });

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'static/dist/')))
// app.use(formidable)
app.use('/api/topic', topic)
app.use('/api/doc', doc)
app.use('/api/user', user)
app.use('/api/message', message)
app.use('/api/comment', comment)

app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

var server = app.listen(3000, function () {
  console.log('Server start at 127.0.0.1:3000')
})

var io = require('socket.io')(server)

io.on('connection', function (socket) {
  socket.on('addme', function () {
    console.log('addme')
  })
  socket.on('topic', function (comment) {
    console.log('topic')
    mongo.add(new model['Comment'](comment), function (err, res) {
      if (err) {
        console.log('socket err is' + err)
      } else {
        io.emit('update', res)
      }
    })
  })
})


// module.exports = app
