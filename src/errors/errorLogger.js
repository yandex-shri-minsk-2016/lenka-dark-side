module.exports = function errorLogger(error, req, res, next) {
    console.log(error);
    next(error);
};
