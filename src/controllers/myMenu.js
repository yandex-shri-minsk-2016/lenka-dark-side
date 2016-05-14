var OrderModel = require('../models/order').model;

module.exports = function(req, res) {
    if(req.body.action == 'menu') {
        req.session.isOwner = "False";
        OrderModel.findOne({_id: req.body.orderId}, function(err, order){
        	if (err) {
        		next();
        	}
        	req.session.order = order;
        	req.session.dishes = [];
        	res.redirect('/services/' + req.session.order.service._id);
        });
    }
};

