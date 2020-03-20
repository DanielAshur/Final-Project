const mongoose = require('mongoose');

var Schema = mongoose.Schema

var PersonSchema = new Schema({
    name: String,
    email: String,
    address : {
        street: String,
        city: String,
        zipcode: String
    }
});

module.exports = mongoose.model('persons', PersonSchema)
