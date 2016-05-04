var ServiceModel = require('../models/service').model;
var DishModel = require('../models/dish').model;

var cityFoodBy = require('./cityFoodBy.json');
var edaBy = require('./edaBy.json');
var nakormimBy = require('./nakormimBy.json');
var pizzatempoBy = require('./pizzaTempoBy.json');

var cityFoodByDishes = require('./dishes/cityFoodBy.json');
var edaByDishes = require('./dishes/edaBy.json');
var nakormimByDishes = require('./dishes/nakormimBy.json');
var pizzatempoByDishes = require('./dishes/pizzaTempoBy.json');

module.exports = function fillDB() {
    ServiceModel.remove({}, function () {
        DishModel.remove({}, function () {
            new ServiceModel(cityFoodBy).save(function (err, model) {
                DishModel.create(cityFoodByDishes, function () {
                    for (var i = 1; i < arguments.length; ++i) {
                        var dishes = arguments[i];
                        for (var j = 0; j < dishes.length; j++) {
                            model.dishes.push(dishes[0]._id);
                        }
                    }
                    model.save();
                });
            });
            new ServiceModel(edaBy).save(function (err, model) {
                DishModel.create(edaByDishes, function () {
                    for (var i = 1; i < arguments.length; ++i) {
                        var dishes = arguments[i];
                        for (var j = 0; j < dishes.length; j++) {
                            model.dishes.push(dishes[0]._id);
                        }
                    }
                    model.save();
                });
            });
            new ServiceModel(nakormimBy).save(function (err, model) {
                DishModel.create(nakormimByDishes, function () {
                    for (var i = 1; i < arguments.length; ++i) {
                        var dishes = arguments[i];
                        for (var j = 0; j < dishes.length; j++) {
                            model.dishes.push(dishes[0]._id);
                        }
                    }
                    model.save();
                });
            });
            new ServiceModel(pizzatempoBy).save(function (err, model) {
                DishModel.create(pizzatempoByDishes, function () {
                    for (var i = 1; i < arguments.length; ++i) {
                        var dishes = arguments[i];
                        for (var j = 0; j < dishes.length; j++) {
                            model.dishes.push(dishes[0]._id);
                        }
                    }
                    model.save();
                });
            });
        });
    });
};