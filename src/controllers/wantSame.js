var OrderModel = require('../models/order').model;
var PersonModel = require('../models/person').model;

module.exports = function wantSame(req, res) {
    OrderModel.findOne({_id: req.body.orderId}, function (err, order) {
        PersonModel.findOne({_id: req.body.userId}, function (err, person) {
            console.log("order: ", req.body.orderId);
            console.log("user: ", req.body.userId);
            order.subscriber.push({
                person: person,
                dishes: order.dishes,
                paid: false
            });
            order.save();
        });
    });
    res.redirect('/');
};
