var express = require('express'),
	app = express(),
	homeControler = require('./src/controllers/home.js'),
	helloController = require('./src/controllers/hello.js'),
	servicesController = require('./src/controllers/services.js'),
	serviceController = require('./src/controllers/service.js'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');

//TODO: Избавиться от хардкода(сделать конфиг) 
mongoose.connect('mongodb://localhost/lenka');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');
app.set('views', './src/views');
app.get('/', homeControler);
app.get('/services', servicesController);
app.get('/hello', helloController);
app.post('/services/:id', serviceController);

//already last(error processing)
app.use(function(req, res) {
  res.render('404.jade');
var server = app.listen(3000, function() {
	console.log('Working 3000');
});
