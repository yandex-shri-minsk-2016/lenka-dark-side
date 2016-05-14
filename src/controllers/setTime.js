var ServiceModel = require('../models/service').model;

module.exports = function setTime(req, res, next) {
    if (req.body.action == 'setTime') {
        req.session.time = req.body.hrs + ":" + req.body.mnts;
        req.session.serviceId = req.body.serviceId;
        res.redirect('/services/'+req.body.serviceId)
    };
};
