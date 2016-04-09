var express = require('express'),
	app = express(),
	homeControler = require('./controllers/home.js');

// app.use(express.static(__dirname + '/public'));

app.get('/', homeControler);

var server = app.listen(3000, function() {
	console.log('Working 3000');
});