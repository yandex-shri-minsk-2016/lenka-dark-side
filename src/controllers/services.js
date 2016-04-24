var ServiceModel = require('../models/service').model;

module.exports = function ServicesController(req, res) {
    ServiceModel.find({}, function(err, services){
        res.render('creatingPage', {services: services});
    });
}