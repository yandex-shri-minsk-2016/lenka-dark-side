var ServiceModel = require('../models/service').model;

module.exports = function ServicesController(req, res) {
    ServiceModel.find({}, function(err, services) {
        if (err) {
            return next(err);
        }
        res.render('services', {services: services, user: req.user});

    });
};
