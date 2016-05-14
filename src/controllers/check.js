var OrderModel = require('../models/order').model;

module.exports = function wantSame(req, res, err) {

    OrderModel.findOne({_id: req.body.orderId}, function (err, order) {
        if (err) {
            return next(err);
        }
        console.log(order);
        order.subscriber.forEach(function (sub) {
            if (sub._id == req.body.subscriberId) {
                sub.paid = req.body.inputChecked;
            }
        });
        order.save(function (err) {
            if (err) {
                next(err);
            } else {
                res.json({
                    ok: 2
                });
            }
        });
    });

};
