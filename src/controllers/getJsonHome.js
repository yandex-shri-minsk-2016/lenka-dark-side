var OrderModel = require("../models/order").model;

module.exports = function HomeJSONController(req, res, next) {
    OrderModel.find({}).populate("dishes").populate("subscriber").populate("subscriber.dishes").exec(function(err, orders) {

        var arrOrders =[];
        var arrSubscribers =[];
        var objData = {};

        if(err) {
            return next(err);
        }

        for (var i = 0; i < orders.length; i++) {
            if (orders[i].owner.id == req.user.id) {
                arrOrders.push(orders[i]);
            }
            for (var j = 0; j < orders[i].subscriber.length; j++) {
                if (orders[i].subscriber[j].person.id == req.user.id) {
                    arrSubscribers.push(orders[i]);
                }
            }
        }

        objData.ownerArr = arrOrders;
        objData.subscriberArr = arrSubscribers;

        res.json(objData);
    });
};