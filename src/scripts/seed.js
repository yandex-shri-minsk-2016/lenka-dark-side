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

var insertSeed = function (serviceData, dishesData) {
    // Создали модель с данными
    var service = new ServiceModel(serviceData);

    // Добавили в нее все блюда
    service.dishes = dishesData.map(function (dish) {
        return new DishModel(dish);
    });

    // Сохраняем все блюда
    var promises = service.dishes.map(function (dish) {
        return dish.save();
    });

    // Дождались сохранения блюд и сохранили сервис
    return Promise.all(promises).then(function () {
        return service.save();
    });
};

module.exports = function fillDB() {
    ServiceModel.remove({}, function () {
        DishModel.remove({}, function () {
            // Вставляем все службы
            var promise = Promise.all([
                insertSeed(cityFoodBy, cityFoodByDishes),
                insertSeed(nakormimBy, nakormimByDishes),
                insertSeed(pizzatempoBy, pizzatempoByDishes),
                insertSeed(edaBy, edaByDishes)
            ]);

            // Дожидаемся окончния и если где-то будет ошибка - 
            // рисуем ее в консоль
            promise.catch(function(err) {
                console.error(err);
            });
        });
    });
};