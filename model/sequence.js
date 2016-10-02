var mongoose = require('mongoose')
var Schema = mongoose.Schema
var models = {}

TopicGenerateSchema = new Schema({
  _id: String,
  next: {
    type: Number,
    default: 1
  }
})

MessageGenerateSchema = new Schema({
  _id: String,
  next: {
    type: Number,
    default: 1
  }
})

CommentGenerateSchema = new Schema({
  _id: String,
  next: {
    type: Number,
    default: 1
  }
})

function increase (schemaName, callback) {
   return this.collection.findOneAndUpdate(
      {_id: schemaName},
      {$inc: {next: 1}}, 
      {new: true, upsert: true}, 
      callback
    )
}

TopicGenerateSchema.statics.increase = increase

MessageGenerateSchema.statics.increase = increase

CommentGenerateSchema.statics.increase = increase

models.TopicGenerate = mongoose.model('TopicGenerate', TopicGenerateSchema)
models.MessageGenerate = mongoose.model('MessageGenerate', MessageGenerateSchema)
models.CommentGenerate = mongoose.model('CommentGenerate', CommentGenerateSchema)

module.exports = models
