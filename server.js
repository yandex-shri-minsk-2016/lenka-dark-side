var express = require('express'),
	app = express(),
	homeControler = require('./src/controllers/home.js'),
	helloController = require('./src/controllers/hello.js'),
	mongoose = require('mongoose');
//TODO: Избавиться от хардкода(сделать конфиг) 
mongoose.connect('mongodb://localhost/lenka');

// app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');
app.set('views', './src/views');
app.get('/', homeControler);
app.get('/hello', helloController);

var server = app.listen(3000, function() {
	console.log('Working 3000');
});

