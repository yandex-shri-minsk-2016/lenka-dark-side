var OrderModel = require('../models/order').model;

module.exports = function HomeController(req, res) {
    OrderModel.find({}, function (err, orders) {
        if (err) res.render('404');
        else res.render('index', {orders: orders});
    });
};
