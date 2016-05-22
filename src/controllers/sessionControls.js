var OrderModel = require('../models/order').model;
var PersonModel = require('../models/person').model;

module.exports = function(req, res) {
    if (req.body.action == 'menu') {
        req.session.isOwner = "False";
        OrderModel.findOne({_id: req.body.orderId}, function(err, order){
            if (err) {
                next();
            }
            req.session.order = order;
            req.session.dishes = [];
            res.redirect('/services/' + req.session.order.service._id);
        });
    }
    if (req.body.action == 'delete') {
        OrderModel.findOneAndRemove({_id: req.body.orderId}, function(err){
            if (err) {
                next();
            }
            res.redirect('back');
        });
    }
    if (req.body.action == 'same') {
        OrderModel.findOne({_id: req.body.orderId}, function (err, order) {
            PersonModel.findOne({_id: req.body.userId}, function (err, person){
                if (err) {
                    next();
                }
                order.subscriber.push({
                    person: person,
                    dishes: order.dishes,
                    paid: false
                });
                order.save();
            });
            res.redirect('back');
        });
    }
    if (req.body.action == 'edit') {
        OrderModel.findOne({_id: req.body.orderId}).populate("dishes").exec(function(err, order) {
            req.session.edit = "True";
            req.session.order = order;
            req.session.dishes = order.dishes;
            res.redirect('/services/' + req.session.order.service._id);
        });
    }
};
