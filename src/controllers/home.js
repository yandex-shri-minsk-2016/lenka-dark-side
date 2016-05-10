var OrderModel = require('../models/order').model;

module.exports = function HomeController(req, res, next) {
    OrderModel.find({})
        .populate("dishes")
        .populate("subscriber.dishes")
        .exec(function (err, orders) {
            if (err) {
                return next(err);
            }
            res.render('index', {orders: orders, user: req.user});
        });
};