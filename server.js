var express = require('express'),
    app = express(),
    homeControler = require('./src/controllers/home.js'),
    helloController = require('./src/controllers/hello.js'),
    servicesController = require('./src/controllers/services.js'),
    serviceController = require('./src/controllers/service.js'),
    mongoose = require('mongoose'),
    auth = require('./src/controllers/auth.js'),
    passport = require('passport'),
    bodyParser = require('body-parser');
	errorHandler = require('./src/errors/errorHandler.js');
	errorLogger = require('./src/errors/errorLogger.js');

//TODO: Избавиться от хардкода(сделать конфиг) 
mongoose.connect('mongodb://localhost/lenka');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(passport.initialize());
// app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');
app.set('views', './src/pages');
app.get('/', homeControler);
app.get('/services', servicesController);
app.get('/hello', helloController);
app.get('/auth/fb', auth());
app.post('/services/:id', serviceController);

app.use(errorLogger);
app.use(errorHandler);
app.use(express.static(__dirname + '/dist'));

//already last(error processing)
app.use(function(req, res) {
  res.render('404.jade');
});
var server = app.listen(3000, function() {
    console.log('Working 3000');
});
