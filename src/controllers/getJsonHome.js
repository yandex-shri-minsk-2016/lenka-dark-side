var OrderModel = require("../models/order").model;

module.exports = function HomeJSONController(req, res, next) {
	OrderModel.find({}, function(err, orders) {
		if(err) {
			return next(err);
		}
		res.json(orders);
	});
};