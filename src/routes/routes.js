var express = require('express');
var router = express.Router();

var servicesController = require('../controllers/services.js');
var serviceController = require('../controllers/service.js');
var passport = require('passport');
var homeController = require('../controllers/home.js');
var myMenu = require('../controllers/myMenu');
var setTime = require('../controllers/setTime');
var addToShoppingCart = require('../controllers/addToShoppingCart');
var addOrder = require('../controllers/addOrder');
var wantSame = require('../controllers/wantSame.js');
var removeFromBasketController = require('../controllers/removeFromBasket.js');

router.get('/', homeController);

router.get('/services', servicesController);
router.post('/setTime', setTime);
router.get('/services/:id', serviceController);
router.get('/removeFromBasket/:id', removeFromBasketController);

router.post('/mymenu', myMenu);

router.get('/auth/fb',passport.authenticate('facebook', {successRedirect: 'back', failureRedirect: '/'}));
router.get('/auth/vk',passport.authenticate('vk', {successRedirect: 'back', failureRedirect: '/'}));
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.post('/orders', addToShoppingCart);

router.post('/basket', addOrder);
router.get('/basket', function(req,res) {
    res.render('/', {order: req.session.order});
    req.session.order = {};
});

router.post('/wantAlso', wantSame);

exports.router = router;
