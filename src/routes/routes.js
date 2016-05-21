var express = require('express');
var router = express.Router();

var servicesController = require('../controllers/services.js');
var serviceController = require('../controllers/service.js');
var passport = require('passport');
var homeController = require('../controllers/home.js');
var sessionControls = require('../controllers/sessionControls');
var setTime = require('../controllers/setTime');
var addToShoppingCart = require('../controllers/addToShoppingCart');
var addOrder = require('../controllers/addOrder');
var removeFromBasketController = require('../controllers/removeFromBasket.js');
var checkController = require('../controllers/check.js');
var authController = require('../controllers/authController.js');

router.get('/', authController);
router.get('/home', homeController);

router.get('/services', servicesController);
router.post('/setTime', setTime);
router.get('/services/:id', serviceController);
router.get('/removeFromBasket/:id', removeFromBasketController);

router.post('/sessionControls', sessionControls);

router.get('/auth/fb',passport.authenticate('facebook', {successRedirect: '/home', failureRedirect: 'back'}));
router.get('/auth/vk',passport.authenticate('vk', {successRedirect: '/home', failureRedirect: 'back'}));
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

router.post('/check', checkController);

exports.router = router;
