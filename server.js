var express = require('express'),
	app = express();

app.use(express.static(__dirname + '/public'));

app.get('/orders.json', function(req, res) {
	res.json({
		status: 'OK'
	})

});

app.listen(3000, function() {
	console.log('Working 3000');
});