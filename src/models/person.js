var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var personSchema = new Schema({
    name:  {type: String, require: true},
    avatar: String,
    telephon: String,
    facebookId: String
});

module.exports = {
    model: mongoose.model('Person', personSchema),
    schema: personSchema
};
