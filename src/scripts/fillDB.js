var DishModel = require('../models/dish').model;
var ServiceModel = require('../models/service').model;

//TODO: сделать папку с посевными данными, дописать скрипт, который перебирает все эти файлы
module.exports = function fillDB() {
    ServiceModel.remove({}, function() {
        var service = new ServiceModel(seed);
        service.save(function (err, model) {
            console.log(model.toJSON());
        });
    });
};
