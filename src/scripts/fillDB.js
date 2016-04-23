/**
 * Created by konstantin on 23.04.16.
 */
var DishModel = require('../models/dish').model;
var ServiceModel = require('../models/service').model;

module.exports = function fillDB() {
    var dish = new DishModel({
        name: 'SOUP',
        price: "40$",
        url: '1515125',
        picture: 'soupPicture'
    });
    var service = new ServiceModel({
        title: "PizzaTempo",
        logo: 'tempoLogo',
        description: 'bestPizza',
        dishes: [dish]
    });
    service.save(function (err, model) {
        console.log(model.toJSON());
    });
};
