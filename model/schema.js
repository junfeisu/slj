var mongoose = require('mongoose')
var topicGenerate = require('./sequence').TopicGenerate
var messageGenerate = require('./sequence').MessageGenerate
var commentGenerate = require('./sequence').CommentGenerate
var Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/slj')

var commentSchema = new Schema({
  comment_id: {
    type: Number,
    index: {unique: true},
    required: true
  },
  comment_content: {
    type: String,
    required: true
  },
  comment_user: {
    type: Number,
    required: true
  },
  comment_date: {
    type: Date,
    required: true
  },
  comment_category: {
    type: Number,
    required: true
  },
  parent_id: {
    type: Number,
    required: true
  }
}, {versionKey: false})

var topicSchema = new Schema({
    topic_name: {
      type: String,
      reuqired: true,
      unique: true
    },
    topic_id: {
      type: Number,
      index: {unique: true},
      reuqired: true
    },
    comments: [commentSchema],
    created: {
      type: Date,
      required: true
    }
  }, {versionKey: false})

var messageSchema = new Schema({
    message_name: {
      type: String,
      reuqired: true,
      unique: true
    },
    message_id: {
      type: Number,
      index: {unique: true},
      reuqired: true
    },
    comments: [commentSchema],
    created: {
      type: Date,
      required: true
    }
  }, {versionKey: false})

var userSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    birthday: {
      type: String,
      required: false
    },
    photo: {
      type: String,
      required: true,
      default: 'http://7xrp7o.com1.z0.glb.clouddn.com/IMG_20160928_142420.jpg'
    },
    user_id: {
      type: Number,
      required: true,
      index: {unique: true}
    },
    password: {
      type: String,
      required: true,
      default: '123456'
    }
  }, {versionKey: false})

topicSchema.pre('save', function(next) {
  var self = this
  console.log('self.topic_id is ' + self.topic_id)
  if (this.isNew) {
    topicGenerate.increase('Topic', function(err, res) {
      if (err) {
        console.log('err is' + JSON.stringify(err))
      } else{
        self.topic_id = res.value.next
        next()
      }
    })
  } else {
    next()
  }
})

messageSchema.pre('save', function(next) {
  var self = this
  if (this.isNew) {
    messageGenerate.increase('Message', function(err, result) {
      if (err) {
        console.log('err is' + JSON.stringify(err))
      } else{
        self.message_id = result.value.next
        next()
      }
    })
  } else {
    next()
  }
})

commentSchema.pre('save', function(next) {
  var self = this
  if (this.isNew) {
    commentGenerate.increase('Comment', function(err, result) {
      if (err) {
        console.log('err is' + JSON.stringify(err))
      } else{
        self.comment_id = result.value.next
        next()
      }
    })
  } else {
    next()
  }
})

exports.model = {
  Topic: mongoose.model('Topic', topicSchema),
  User: mongoose.model('User', userSchema),
  Message: mongoose.model('Message', messageSchema),
  Comment: mongoose.model('Comment', commentSchema)
}
