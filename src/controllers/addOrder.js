var OrderModel = require('../models/order').model;

module.exports = function(req,res,next) {
    if (req.body.action == 'newOrder' && req.session.dishes) {
        var order = {};
        if(req.session.isOwner == "True") {
            order.owner = req.user;
            order.subscriber = [];
            order.dishes = req.session.dishes;
            order.time = "00.00";
            order.service = req.body.service;
        }
        else {
            var subscriber = {};
            subscriber.person = req.user;
            subscriber.dishes = req.session.dishes;
            subscriber.paid = False;
            order.subscriber.push(subscriber);
        }
    }
    req.session.order = order;
    var o = new OrderModel(req.session.order);
    o.save(function(err){
        if(!err){
            req.session.order = {};
            res.redirect('/');
        }else{
            res.redirect('/');
        }
    })
}