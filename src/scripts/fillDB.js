/**
 * Created by konstantin on 23.04.16.
 */
var DishModel = require('../models/dish').model;
var ServiceModel = require('../models/service').model;
var seed = require('./seed.json');
var cityfoodby = require('./cityfoodby.json');
var edaby = require('./edaby.json');
var nakormimby = require('./nakormimby.json');
var pizzatempoby = require('./pizzatempoby.json');
//TODO: сделать папку с посевными данными, дописать скрипт, который перебирает все эти файлы
module.exports = function fillDB() {
    ServiceModel.remove({}, function() {
        var serviceCityFoodBy = new ServiceModel(cityfoodby);
        serviceCityFoodBy.save(function (err, model) {
            console.log(model.toJSON());
        });
        var serviceEdaBy = new ServiceModel(edaby);
        serviceEdaBy.save(function (err, model) {
            console.log(model.toJSON());
        });
        var serviceNakormimBy = new ServiceModel(nakormimby);
        serviceNakormimBy.save(function (err, model) {
            console.log(model.toJSON());
        });
        var servicePizzaTempoBy = new ServiceModel(pizzatempoby);
        servicePizzaTempoBy.save(function (err, model) {
            console.log(model.toJSON());
        });
    });
};
