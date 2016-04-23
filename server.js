var express = require('express'),
	app = express(),
	homeControler = require('./src/controllers/home.js'),
	helloController = require('./src/controllers/hello.js'),
	mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/lenka');

// app.use(express.static(__dirname + '/public'));

app.get('/', homeControler);
app.get('/hello', helloController);

var server = app.listen(3000, function() {
	console.log('Working 3000');
});

