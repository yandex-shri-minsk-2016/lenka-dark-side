

module.exports = function(req, res) {
    if(req.body.action == 'menu') {
        req.session.isOwner = "False";
        req.session.orderId = req.body.orderId;
        res.redirect('/services/' + req.body.serviceId);
    }
}
