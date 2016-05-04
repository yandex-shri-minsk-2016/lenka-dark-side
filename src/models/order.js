var mongoose = require('mongoose');

var serviceSchema = require('./service').schema;
var Dish = require('./dish').model;
var personSchema = require('./person').schema;

var Schema = mongoose.Schema;

var orderSchema = new Schema({
    owner: personSchema,
    service: serviceSchema,
    time: String,
    subscriber: [{ person: personSchema, dish: { type: Schema.Types.ObjectId, ref: 'Dish' }, paid: Boolean }]
});

module.exports = {
    model: mongoose.model('Order', orderSchema),
    schema: orderSchema
};