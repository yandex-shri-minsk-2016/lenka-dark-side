var ServiceModel = require('../models/service').model;

module.exports = function ServiceController(req, res) {
    ServiceModel.findOne({_id: req.params.id}, function (err, service) {
        res.render('menuPage', service || {});
    });
};
