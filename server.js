var express = require('express'),
	app = express(),
	homeControler = require('./src/controllers/home.js'),
	helloController = require('./src/controllers/hello.js'),
	serviceController = require('./src/controllers/service.js'),
	mongoose = require('mongoose');
//TODO: Избавиться от хардкода(сделать конфиг) 
mongoose.connect('mongodb://localhost/lenka');

// app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');
app.set('views', './src/views');
app.get('/', homeControler);
app.get('/services/:id', serviceController);
app.get('/hello', helloController);
//already last(error processing)
app.use(function(req, res) {
  res.render('404.jade');
});

var server = app.listen(3000, function() {
	console.log('Working 3000');
});
