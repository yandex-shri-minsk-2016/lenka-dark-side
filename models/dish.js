var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var dishSchema = new Schema({
    name:  String,
    price: String,
    url: String,
    picture: String
});

module.exports = {
	model: mongoose.model('Dish', dishSchema),
	schema: dishSchema
};
