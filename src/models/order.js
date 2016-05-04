var mongoose = require('mongoose');

var Service = require('./service').model;
var Dish = require('./dish').model;
var Person = require('./person').model;

var Schema = mongoose.Schema;

var orderSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'Person' },
    service: { type: Schema.Types.ObjectId, ref: 'Service' },
    time: String,
    subscriber: [{ person: { type: Schema.Types.ObjectId, ref: 'Person' }, dish: { type: Schema.Types.ObjectId, ref: 'Dish' }, paid: Boolean }]
});

module.exports = {
    model: mongoose.model('Order', orderSchema),
    schema: orderSchema
};