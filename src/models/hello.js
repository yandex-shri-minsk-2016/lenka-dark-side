var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var helloSchema = new Schema({
    title:  String
});

var Hello = mongoose.model('Hello', helloSchema);

module.exports = Hello;