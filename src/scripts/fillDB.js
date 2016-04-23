/**
 * Created by konstantin on 23.04.16.
 */
var DishModel = require('../models/dish').model;
var ServiceModel = require('../models/service').model;
var seed = require('./seed.json');
//TODO: сделать папку с посевными данными, дописать скрипт, который перебирает все эти файлы
module.exports = function fillDB() {
    var service = new ServiceModel(seed);
    service.save(function (err, model) {
        console.log(model.toJSON());
    });
};
