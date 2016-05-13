module.exports = function(req,res,next) {
    if (req.body.action == 'newOrder' && req.session.dishes) {
        var order = {};
        console.log(req.session.dishes);
        for (var i = 0; i < req.session.dishes; i++) {
            console.log("time" + i);
        }
        order.dishes = req.session.dishes;
        order.owner = req.user;
        order.subscriber = [];
        order.service = req.body.service;
    }
    req.session.order = order;
    res.redirect('/');
}