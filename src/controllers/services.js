var ServiceModel = require('../models/service').model;

module.exports = function ServicesController(req, res) {
    ServiceModel.find({}).populate('dishes').exec(function(err, services) {
        if (err) {
            return next(err);
        }
        console.log(services);
        res.render('services', {services: services});
    });
};
