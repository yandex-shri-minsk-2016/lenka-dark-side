var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var personSchema = new Schema({
    name:  {type: String, require: true},
    avatar: String,
    phone: String,
    facebookId: String,
    vkId: String
});

module.exports = {
    model: mongoose.model('Person', personSchema),
    schema: personSchema
};
