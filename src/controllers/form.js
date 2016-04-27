var ServiceModel = require('../models/service').model;

module.exports = function ServiceController(req, res, next) {
	console.log(req.body);
    ServiceModel.findOne({_id: req.params.id}, function(err, service){
        res.render('menuPage', {dishes: service.dishes} || {});
    });
}