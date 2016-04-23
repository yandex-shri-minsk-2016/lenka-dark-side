var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var personSchema = new Schema({
    name:  {type: String, require: true},
    avatar: String,
    telephon: String
});

var Person = mongoose.model('Person', personSchema);

module.exports = {
	model: Person,
	schema: personSchema
};
