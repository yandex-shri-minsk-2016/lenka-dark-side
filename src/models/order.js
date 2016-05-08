var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serviceSchema = require('./service').schema;
var Dish = require('./dish').model;
var personSchema = require('./person').schema;

var orderSchema = new Schema({
    owner: personSchema,
    dishes: [{ type: Schema.Types.ObjectId, ref: 'Dish' }],
    service: serviceSchema,
    time: String,
    subscriber: [{ person: personSchema, dishes: [{ type: Schema.Types.ObjectId, ref: 'Dish' }], paid: Boolean }]
});

module.exports = {
    model: mongoose.model('Order', orderSchema),
    schema: orderSchema
};
