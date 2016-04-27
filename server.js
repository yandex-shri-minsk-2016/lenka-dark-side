var express = require('express'),
	app = express(),
	homeControler = require('./src/controllers/home.js'),
	helloController = require('./src/controllers/hello.js'),
	servicesController = require('./src/controllers/services.js'),
	serviceController = require('./src/controllers/service.js'),
	mongoose = require('mongoose');
//TODO: Избавиться от хардкода(сделать конфиг) 
mongoose.connect('mongodb://localhost/lenka');

// app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');
app.set('views', './src/views');
app.get('/', homeControler);
app.get('/services', servicesController);
app.get('/services/:id', serviceController);
app.get('/hello', helloController);
app.post('/process_post', urlencodedParser, function (req, res) {

   // Prepare output in JSON format
   response = {
       first_name:req.body.first_name,
       last_name:req.body.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
});

//already last(error processing)
app.use(function(req, res) {
  res.render('404.jade');

var server = app.listen(3000, function() {
	console.log('Working 3000');
});
