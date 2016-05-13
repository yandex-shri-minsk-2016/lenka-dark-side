var DishModel = require('../models/dish').model;
var Promise = require('promise');

module.exports = function(req, res) {
    if (req.body.action == 'add') {
        var item;
        var promise = new Promise(function(resolve, reject) {
            if (!req.session.dishes) {
                req.session.dishes = [];
            }
            item = {};
        });
        promise.then(function(){
            DishModel.findOne({_id: req.body.dishId}, function(err, dish){
                if (err) {
                    return next(err);
                }
                console.log("dish"+dish);
                item = dish;
                console.log("item"+item);
            });
        });
        promise.then(function(){
            console.log("item after" + item);
            req.session.dishes = req.session.dishes.concat(item);
            res.redirect('back');
        });
        
        //item.title = req.body.dishTitle;
        //item.price = req.body.dishPrice;
        
    }
}