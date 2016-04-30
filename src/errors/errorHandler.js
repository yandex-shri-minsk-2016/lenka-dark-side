module.exports = function errorHandler(error, req, res, next) {
    res.render('errorPage');
};
