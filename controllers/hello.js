var HelloModel = require('../models/hello')

module.exports = function HelloController(req, res) {
    var hello = new HelloModel ({ title: req.query.title });
    hello.save(function(err, model) {
        res.send(model.toJSON());
    })    
}
//TODO: make ES6