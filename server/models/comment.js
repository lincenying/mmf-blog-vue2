var mongoose = require('mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')

var CommentSchema = new Schema({
    article_id: String,
    username: String,
    email: String,
    content: String,
    reply_id: String,
    reply_user: String,
    creat_date: String,
    is_delete: Number,
    timestamp: Number
})

var Comment = mongoose.model('Comment', CommentSchema)
Promise.promisifyAll(Comment)
Promise.promisifyAll(Comment.prototype)

module.exports = Comment
