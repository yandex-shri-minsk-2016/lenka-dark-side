var express = require('express'),
    app = express(),

    mongoose = require('mongoose'),
    auth = require('./src/controllers/auth.js'),
    passport = require('passport'),
    session = require('express-session'),

    bodyParser = require('body-parser'),

    errorHandler = require('./src/errors/errorHandler.js'),
    errorLogger = require('./src/errors/errorLogger.js'),

    homeController = require('./src/controllers/home.js'),
    servicesController = require('./src/controllers/services.js'),
    serviceController = require('./src/controllers/service.js'),
    addOrder = require('./src/controllers/addOrder.js'),

    cookieParser = require('cookie-parser');
var DishModel = require('./src/models/dish').model;

//TODO: Избавиться от хардкода(сделать конфиг) 
mongoose.connect('mongodb://localhost/lenka');

app.use(cookieParser());
app.use(session({
    secret: 'appsecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: new Date(Date.now() + 3600000)
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'jade');
app.set('views', './src/pages');
app.get('/', homeController);
app.get('/services', servicesController);
app.get('/services/:id', serviceController);

app.post('/mymenu', function(req, res) {
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
app.get('/mymenu', function(req, res){
    res.render('menuPage', {customerName: ownerName, time: orderTime, orderId: orderId});
});

app.use(errorLogger);
app.use(errorHandler);
app.use(express.static(__dirname + '/dist'));

app.get('/auth/fb',passport.authenticate('facebook', {successRedirect: 'back', failureRedirect: '/'}));
app.get('/auth/vk',passport.authenticate('vk', {successRedirect: 'back', failureRedirect: '/'}));

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

app.post('/orders', function(req, res) {
    if (req.body.action == 'add'){
        if(!req.session.dishes){
            req.session.dishes = [];
        }
        var item = {};
        item._id = req.body.dishId;
        item.title = req.body.dishTitle;
        item.price = req.body.dishPrice;
        req.session.dishes.push(item); 
        res.redirect('back');
    }
});

app.get('/orders', function(req, res){
    res.render('menuPage', {orders: req.session.dishes});
});

app.post('/basket', function(req,res,next){
    if (req.body.action == 'newOrder' && req.session.dishes){
    //  var orderSchema = new Schema({
    //
    //
    //service: serviceSchema,
    //time: String,

    //subscriber: [{ person: personSchema, dishes: [{ type: Schema.Types.ObjectId, ref: 'Dish' }], paid: Boolean }]

//});
    var order = {};
    console.log(req.session.dishes);
    for (var i = 0; i < req.session.dishes; i++){
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
app.get('/basket', function(req,res){
    console.log(req.session.order);
    res.render('/', {order: req.session.order});
    req.session.order = {};
});
//already last(error processing)
app.use(function(req, res) {
  res.render('404');
});
app.listen(3000, function() {
    console.log('Working 3000');
});
