var mongoose = require('mongoose');
var dishSchema = require('./dish').schema;

var Schema = mongoose.Schema;

var serviceSchema = new Schema({
    logo: String,
    title:  String,
    kitchen: String,
    mincost: Number,
    costDelivery: String,
    departureTime: String,
    workTime: String,
    phone: [String],
    dishes: [dishSchema]
});

module.exports = {
    model: mongoose.model('Service', serviceSchema),
    schema: serviceSchema
};
