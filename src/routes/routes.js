var express = require('express');
var router = express.Router();

var servicesController = require('../controllers/services.js');
var serviceController = require('../controllers/service.js');
var passport = require('passport');
var homeController = require('../controllers/home.js');
var myMenu = require('../controllers/myMenu');
var addOrder = require('../controllers/addOrder');

router.get('/', homeController);

router.get('/services', servicesController);
router.get('/services/:id', serviceController);

router.post('/mymenu', myMenu);
router.get('/mymenu', function(req, res){
    res.render('menuPage', {customerName: ownerName, time: orderTime, orderId: orderId});
});

router.get('/auth/fb',passport.authenticate('facebook', {successRedirect: 'back', failureRedirect: '/'}));
router.get('/auth/vk',passport.authenticate('vk', {successRedirect: 'back', failureRedirect: '/'}));
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.post('/orders', addOrder);

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
