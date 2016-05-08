var ServiceModel = require('../models/service').model;

module.exports = function ServiceController(req, res, next) {
    ServiceModel.findOne({_id: req.params.id}).populate("dishes").exec(function(err, service){
        if (err) {
            return next(err);
        }
        res.render('menuPage', {service: service});

    });
};
