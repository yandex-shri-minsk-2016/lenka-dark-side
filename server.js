var express = require('express'),
    app = express(),
    homeControler = require('./src/controllers/home.js'),
    helloController = require('./src/controllers/hello.js'),
    servicesController = require('./src/controllers/services.js'),
    serviceController = require('./src/controllers/service.js'),
    mongoose = require('mongoose'),
    authfb = require('./src/controllers/authfb.js'),
    authvk = require('./src/controllers/authvk.js'),
    passport = require('passport'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');
    errorHandler = require('./src/errors/errorHandler.js');
    errorLogger = require('./src/errors/errorLogger.js');

//TODO: Избавиться от хардкода(сделать конфиг) 
mongoose.connect('mongodb://localhost/lenka');

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

app.use(function(req, res, next) {
    console.log(req.user)
    next();
});

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.set('view engine', 'jade');
app.set('views', './src/pages');
app.get('/', homeControler);
app.get('/services', servicesController);
app.get('/hello', helloController);
app.get('/services/:id', serviceController);

app.use(errorLogger);
app.use(errorHandler);
app.use(express.static(__dirname + '/dist'));

app.get('/auth/fb', authfb());
app.get('/auth/vk', authvk());

//already last(error processing)
app.use(function(req, res) {
  res.render('404.jade');
});
var server = app.listen(3000, function() {
    console.log('Working 3000');
});
