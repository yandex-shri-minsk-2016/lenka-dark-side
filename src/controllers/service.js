var ServiceModel = require('../models/service').model;

module.exports = function ServiceController(req, res, next) {
    ServiceModel.findOne({_id: req.params.id}).populate("dishes").exec(function(err, service){
        if (err) {
            return next(err);
        }
        if (!orders) {
        	var orders = [];
        }
        res.render('menuPage', {service: service, orders: orders, user: req.user});
    });
};
