var OrderModel = require('../models/order').model;

module.exports = function HomeController(req, res, next) {
    OrderModel.find({}, function(err, orders) {
        if (err) {
            return next(err);
        }

        res.render('index', {orders: orders});
    });
};
