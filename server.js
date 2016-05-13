var express = require('express'),
    app = express(),

    mongoose = require('mongoose'),
    auth = require('./src/controllers/auth.js'),
    passport = require('passport'),
    session = require('express-session'),

    bodyParser = require('body-parser'),

    errorHandler = require('./src/errors/errorHandler.js'),
    errorLogger = require('./src/errors/errorLogger.js'),

    routes = require('./src/routes/routes.js'),

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

app.use('/', routes.router);

app.set('view engine', 'jade');
app.set('views', './src/pages');

app.use(errorLogger);
app.use(errorHandler);
app.use(express.static(__dirname + '/dist'));

//already last(error processing)
app.use(function(req, res) {
    res.render('404');
});

app.listen(3000, function() {
    console.log('Working 3000');
});
