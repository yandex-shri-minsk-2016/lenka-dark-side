var express = require('express'),
    app = express(),
    homeController = require('./src/controllers/home.js'),
    helloController = require('./src/controllers/hello.js'),
    serviceController = require('./src/controllers/service.js'),
    config = require('./src/config/config.js'),
    mongoose = require('mongoose');

// Connect to mongodb
var connect = function () {
    var options = {server: {socketOptions: {keepAlive: 1}}};
    mongoose.connect(config.db, options);
};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');
app.set('views', './src/views');
app.get('/', homeController);
app.get('/services/:id', serviceController);
app.get('/hello', helloController);

var server = app.listen(3000, function () {
    console.log('Working 3000');
});
