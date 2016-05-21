var OrderModel = require('../models/order').model;
var OrderModel = require('../models/order').model;
var PersonModel = require('../models/person').model;

module.exports = function(req, res) {
    switch (req.body.action) {
        case 'menu':
            req.session.isOwner = "False";
            OrderModel.findOne({_id: req.body.orderId}, function(err, order){
                if (err) {
                    next();
                }
                req.session.order = order;
                req.session.dishes = [];
                res.redirect('/services/' + req.session.order.service._id);
            });
            break
        case 'delete':
            OrderModel.findOneAndRemove({_id: req.body.orderId}, function(err){
                if (err) {
                    next();
                }
            });
            res.redirect('back');
            break
        case 'same':
            OrderModel.findOne({_id: req.body.orderId}, function (err, order) {
                PersonModel.findOne({_id: req.body.userId}, function (err, person) {
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
            });
            res.redirect('back');
            break
        case 'edit':
            OrderModel.findOne({_id: req.body.orderId}, function (err, order) {
                req.session.order = order;
                req.session.dishes = order.dishes;
                console.log(req.session.dishes);
                console.log('------------------------------------------');
                res.redirect('/services/' + req.session.order.service._id);
            });
            break
        default:
            res.redirect('back');
    }
};