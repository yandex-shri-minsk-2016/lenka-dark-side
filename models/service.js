var mongoose = require('mongoose');
var dishSchema = require('./dish').schema;

var Schema = mongoose.Schema;

var serviceSchema = new Schema({
    title:  String,
    logo: String,
    description: String,
    dishes: [dishSchema]
});

module.exports = {
	model: mongoose.model('Service', serviceSchema),
	schema: serviceSchema
};