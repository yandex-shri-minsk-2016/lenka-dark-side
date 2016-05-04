var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Dish = require('./dish').model;

var serviceSchema = new Schema({
    logo: String,
    title:  String,
    kitchen: String,
    mincost: Number,
    costDelivery: String,
    departureTime: String,
    workTime: String,
    phone: [String],
    dishes: [{ type: Schema.Types.ObjectId, ref: 'Dish' }]
});

module.exports = {
    model: mongoose.model('Service', serviceSchema),
    schema: serviceSchema
};
