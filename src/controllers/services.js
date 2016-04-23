var ServiceModel = require('../models/service').model;

module.exports = function ServiceController(req, res) {
    ServiceModel.find({}, function(err, services){
        res.render('creatingPage', {services: services});
    });
}