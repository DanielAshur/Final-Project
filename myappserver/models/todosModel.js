const mongoose = require('mongoose');

var Schema = mongoose.Schema

var TodosSchema = new Schema({
    userId: String,
    title: String,
    completed: Boolean
});

module.exports = mongoose.model('todos', TodosSchema)
