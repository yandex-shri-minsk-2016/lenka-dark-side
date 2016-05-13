var ServiceModel = require('../models/service').model;

module.exports = function ServiceController(req, res, next) {
    ServiceModel.findOne({_id: req.params.id}).populate("dishes").exec(function(err, service){
        if (err) {
            return next(err);
        }
        if (!req.session.dishes) {
            req.session.dishes = [];
        }
        console.log("service" + service);
        res.render('menuPage', {service: service, orders: req.session.dishes, user: req.user});
    });
};
