var mongo = require('./mongo').mongoUse
var model = require('./schema').model
var relativeMessage = {
  getComment: function (obj, res) {
    obj.forEach((value, index) => {
      mongo.search(model.Comment, {
        comment_category: 1,
        parent_id: value.topic_id
      }, function (err, comment) {
          if (err) {
            res.status(500).json(err)
          } else {
            value.comments = comment
            mongo.search(model.User, {username: value.post_user}, function (error, user) {
              if (error) {
                res.status(500).json(error)
              } else {
                value['user'] = user[0]
                index === obj.length - 1 ? res.json(obj) : console.log('continue')
              }
            })
          }
      })
    })
  }
}

module.exports = relativeMessage