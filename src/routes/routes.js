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
    if(req.body.action == 'menu'){
        if(!req.session.orders){
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

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

router.post('/orders', function(req, res) {
    if (req.body.action == 'add'){
        if(!req.session.dishes){
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

exports.router = router;
