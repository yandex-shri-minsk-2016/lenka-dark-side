var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dishSchema = new Schema({
    name:  String,
    price: Number,
    url: String,
    category: String,
    picture: String
});

module.exports = {
    model: mongoose.model('Dish', dishSchema),
    schema: dishSchema
};
