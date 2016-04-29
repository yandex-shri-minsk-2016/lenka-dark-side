var ServiceModel = require('../models/service').model;

module.exports = function ServiceController(req, res) {
    ServiceModel.findOne(req.params.id, function (err, service) {
        if (err) res.render('404');
        else res.render('menuPage', service || {});
    });
};
