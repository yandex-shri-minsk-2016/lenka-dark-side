var DishModel = require('../models/dish').model;

module.exports = function(req, res) {
    if (req.body.action == 'add') {
        if(!req.session.dishes) {
            req.session.dishes = [];
        }
        var item = {};
        item.title = req.body.dishTitle;
        item.price = req.body.dishPrice;
        req.session.dishes = req.session.dishes.concat(item);
        console.log(req.session.dishes);
        res.redirect('back');
    }
}