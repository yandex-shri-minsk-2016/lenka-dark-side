var DishModel = require('../models/dish').model
var ServiceModel = require('../models/service').model
var PersonModel = require('../models/person').model
var OrderModel = require('../models/order').model

module.exports = function HelloController(req, res) {
    var dish = new DishModel ({ name: 'SOUP', price: "40$", url: '1515125', picture: 'soupPicture' });
    var person = new PersonModel ({ name: 'Lenka', avatar: "LenkaBestPhoto", telephon: "-" });
    var service = new ServiceModel({title:  "PizzaTempo", logo: 'tempoLogo', description: 'bestPizza',  menu: [dish]});
    var order = new OrderModel({owner: person,
    service: service,
    time: "14:00",
    subscriber: [{ person: person, dish: dish, paid: true }]
});
    order.save(function(err, model) {
    	res.send(model.toJSON());
    });  
}
//TODO: make ES6