var express = require('express'),
    app = express(),
    homeController = require('./src/controllers/home.js'),
    helloController = require('./src/controllers/hello.js'),
    serviceController = require('./src/controllers/service.js'),
    config = require('config'),
    mongoose = require('mongoose');

    mongoose.connect(config.get('mongoose.uri'));

// app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');
app.set('views', './src/views');
app.get('/', homeController);
app.get('/services/:id', serviceController);
app.get('/hello', helloController);

var server = app.listen(3000, function () {
    console.log('Working 3000');
});
