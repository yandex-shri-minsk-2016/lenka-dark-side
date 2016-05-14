var ServiceModel = require('../models/service').model;

module.exports = function setTime(req, res, next) {
    if (req.body.action == 'setTime') {
        var hrs = +req.body.hrs;
        var mnts = +req.body.mnts;
        if (((hrs ^ 0) === hrs) && ((mnts ^ 0) === mnts) && (hrs < 24) && (hrs > 0) && (mnts < 60) && (mnts > 0)) {
            req.session.time = req.body.hrs + ":" + req.body.mnts;
            req.session.serviceId = req.body.serviceId;
            res.redirect('/services/'+req.body.serviceId)
        }
        else {
            res.redirect("back");
        }
    };
}