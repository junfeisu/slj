var mongoose = require('mongoose')
var topicGenerate = require('./sequence').TopicGenerate
var messageGenerate = require('./sequence').MessageGenerate
var commentGenerate = require('./sequence').CommentGenerate
var Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/slj')

var commentSchema = new Schema({
  comment_id: {
    type: Number,
    unique: true,
    required: true
  },
  comment_content: {
    type: String,
    required: true
  },
  comment_user: {
    type: String,
    required: true
  },
  comment_date: {
    type: Date,
    required: true,
    default: Date.now()
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
      default: 'http://7xrp7o.com1.z0.glb.clouddn.com/sujunfei.jpg'
    },
    user_id: {
      type: Number,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      default: '123456'
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
      unique: true,
      required: true
    },
    post_user: {
      type: String,
      required: true
    },
    comments: [commentSchema],
    illustrations: [String],
    user: userSchema,
    created: {
      type: Date,
      required: true,
      default: Date.now()
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
      required: true
    },
    comments: [commentSchema],
    post_user: {
      type: String,
      required: true
    },
    created: {
      type: Date,
      required: true,
      default: Date.now()
    }
  }, {versionKey: false})

topicSchema.pre('save', function(next) {
  var self = this
  if (this.isNew) {
    topicGenerate.increase('Topic', function(err, res) {
      if (err) {
        console.log('err is' + JSON.stringify(err))
      } else{
        console.log('res is ' + JSON.stringify(res))
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
