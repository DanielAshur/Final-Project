const mongoose = require('mongoose');

var Schema = mongoose.Schema

var PostsSchema = new Schema({
    userId: String,
    title: String,
    body: String
});

module.exports = mongoose.model('posts', PostsSchema)
