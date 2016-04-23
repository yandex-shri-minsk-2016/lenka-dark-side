var ServiceModel = require('../models/service').model;

module.exports = function MenuController(req, res, next) {
    ServiceModel.findOne({_id: req.params.id}, function(err, service){
        res.render('menuPage', service || {});
    });
}
