

module.exports = function(req, res) {
    if(req.body.action == 'menu') {
        if(!req.session.orders) {
            req.session.orders = [];
        }
        req.session.orders.push(req.body.orderNameCustomer);
        req.session.orders.push(req.body.orderTime);
        req.session.orders.push(req.body.orderServiceId);
        res.redirect('/services/' + req.body.orderServiceId);
    }
}