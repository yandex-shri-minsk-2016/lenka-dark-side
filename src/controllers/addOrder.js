var OrderModel = require('../models/order').model;
var ServiceModel = require('../models/service').model;

module.exports = function(req,res,next) {
    if (req.body.action == 'newOrder' && req.session.dishes) {
        var order = {};
        if(req.session.isOwner == "True") {
            order.owner = req.user;
            order.subscriber = [];
            order.dishes = req.session.dishes;
            order.time = req.session.time;
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
            order.subscriber.push(subscriber);
        }
    }
}