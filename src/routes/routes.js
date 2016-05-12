var express = require('express');
var router = express.Router();

var servicesController = require('../controllers/services.js');
var serviceController = require('../controllers/service.js');
var passport = require('passport');
var homeController = require('../controllers/home.js');

router.get('/', homeController);
router.get('/services', servicesController);
router.get('/services/:id', serviceController);

router.post('/mymenu', function(req, res) {
    if(req.body.action == 'menu') {
        if(!req.session.orders) {
            req.session.orders = [];
        }
        req.session.orders.push(req.body.orderNameCustomer);
        req.session.orders.push(req.body.orderTime);
        req.session.orders.push(req.body.orderServiceId);
        console.log(req.session.orders);
        res.redirect('/services/' + req.body.orderServiceId);

    }
});

router.get('/mymenu', function(req, res){
    res.render('menuPage', {customerName: ownerName, time: orderTime, orderId: orderId});
});

router.get('/auth/fb',passport.authenticate('facebook', {successRedirect: 'back', failureRedirect: '/'}));
router.get('/auth/vk',passport.authenticate('vk', {successRedirect: 'back', failureRedirect: '/'}));

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.post('/orders', function(req, res) {
    if (req.body.action == 'add') {
        if(!req.session.dishes) {
            req.session.dishes = [];
        }
        var item = {};
        item.title = req.body.dishName;
        item.price = req.body.dishPrice;
        req.session.dishes = req.session.dishes.concat(item);
        console.log(req.session.dishes);
        res.render('menuPage', {orders: req.session.dishes});
        res.redirect('back');
    }
});

router.get('/orders', function(req, res) {
    res.render('menuPage', {orders: req.session.dishes});
});

router.post('/basket', function(req,res,next) {
    if (req.body.action == 'newOrder' && req.session.dishes) {
        var order = {};
        console.log(req.session.dishes);
        for (var i = 0; i < req.session.dishes; i++) {
            console.log("time" + i);
        }
        order.dishes = req.session.dishes;
        order.owner = req.user;
        order.subscriber = [];
        order.service = req.body.service;
    }
    req.session.order = order;
    res.redirect('/');
});

router.get('/basket', function(req,res) {
    console.log(req.session.order);
    res.render('/', {order: req.session.order});
    req.session.order = {};
});

exports.router = router;
