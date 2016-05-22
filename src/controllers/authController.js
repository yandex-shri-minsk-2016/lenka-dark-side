var OrderModel = require('../models/order').model;
var OrderModel = require('../models/order').model;
var PersonModel = require('../models/person').model;

module.exports = function authController(req, res) {
	res.render('authPage', {});
}