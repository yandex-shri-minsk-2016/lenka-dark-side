var OrderModel = require('../models/order').model;
var ServiceModel = require('../models/service').model;

module.exports = function(req,res,next) {
    if (req.body.action == 'newOrder' && req.session.dishes) {
        var order = {};
        if(req.session.isOwner == "True") {
            order.owner = req.user;
            order.dishes = req.session.dishes;
            order.time = req.session.time;
            order.subscriber = [];
            ServiceModel.findOne({_id: req.session.serviceId}).populate("dishes").exec(function(err, service){
                if (err) {
                    return next(err);
                }
                order.service = service;
                req.session.order = order;
                var o = new OrderModel(req.session.order);
                o.save(function(err){
                    if(!err){
                        req.session.order = {};
                        req.session.dishes = {};
                        res.redirect('/');
                    }else{
                        res.redirect('/');
                    }
                });
            });
        }
        else {
            var subscriber = {};
            subscriber.person = req.user;
            subscriber.dishes = req.session.dishes;
            subscriber.paid = false;
            OrderModel.findOne({_id: req.session.order}, function(err, order){
                if(err) {
                    next();
                }
                order.subscriber.push(subscriber);
                order.save(function(err){
                    if(!err){
                        req.session.order = {};
                        req.session.dishes = {};
                        res.redirect('/');
                    }else{
                        res.redirect('/');
                    }
                });
            });
        }
    }
}