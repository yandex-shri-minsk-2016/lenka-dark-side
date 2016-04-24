var express = require('express'),
	app = express(),
	homeControler = require('./src/controllers/home.js'),
	servicesController = require('./src/controllers/services'),
	
	mongoose = require('mongoose');
//TODO: Избавиться от хардкода(сделать конфиг) 
mongoose.connect('mongodb://localhost/lenka');

app.set('view engine', 'jade');
app.set('views', './src/views');
app.get('/', homeControler);
app.get('/services', servicesController);

var server = app.listen(3000, function() {
	console.log('Working 3000');
});

