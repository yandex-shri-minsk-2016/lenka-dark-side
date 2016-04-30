var mongoose = require('mongoose');
var dishSchema = require('./dish').schema;

var Schema = mongoose.Schema;

var serviceSchema = new Schema({
    logo: String,
    title:  String,
    categories: String,
    mincost: String,
    derpature: String,
    timework: String,
    downtext: String,
    description: String,
    dishes: [dishSchema]
});

module.exports = {
    model: mongoose.model('Service', serviceSchema),
    schema: serviceSchema
};
