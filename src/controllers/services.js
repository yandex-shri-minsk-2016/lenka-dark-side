var ServiceModel = require('../models/service').model;

module.exports = function ServicesController(req, res) {
    ServiceModel.find({}, function(err, services) {
        if (err) {
            return next(err);
        }
        if (req.session.dishes) {
            req.session.dishes = [];
        }
        req.session.isOwner = req.query.owner;
        req.session.order = {};
        res.render('services', {services: services, user: req.user});
    });
};
