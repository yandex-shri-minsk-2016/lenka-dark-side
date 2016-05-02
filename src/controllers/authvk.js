var passport = require('passport');
var VKStrategy = require('passport-vkontakte').Strategy;

var Person = require('./../models/person').model;

module.exports = function () {
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        Person.findOne({_id: id}, function(err, user) {
           done(err, user);
        });
    });
    passport.use(
        new VKStrategy({
            'clientID': '5444257',
            'clientSecret': '23fIOGbDEV77oxLIOuOL',
            'callbackURL': 'http://localhost:3000/auth/vk'
        },
        function (token, refreshToken, profile, done) {
            process.nextTick(function () {

                Person.findOne({'vkId': profile.id}, function (err, user) {

                    if (err)
                        return done(err);

                    if (user) {
                        return done(null, user);
                    } else {
                        var newPerson = new Person();
                        newPerson.vkId = profile.id;
                        newPerson.name = profile.displayName;
                        newPerson.save(function (err) {
                            if (err)
                                throw err;

                            return done(null, newPerson);
                        });
                    }
                });
                
            });
        })
    );
    return passport.authenticate('vkontakte', {scope: 'email', successRedirect: '/'});
};
