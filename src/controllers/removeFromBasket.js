module.exports = function (req, res) {
    req.session.dishes = req.session.dishes.filter(function (dish) {
        return dish._id !== req.params.id;
    });

    res.redirect('back');
};
