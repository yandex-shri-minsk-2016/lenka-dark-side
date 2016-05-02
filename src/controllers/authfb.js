var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

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
        new FacebookStrategy({

            'clientID': '1055036224558106',
            'clientSecret': 'c4a9c9b0079b319785e5a75f3373c37b',
            'callbackURL': 'http://localhost:3000/auth/fb'
        },


        function (token, refreshToken, profile, done) {
            process.nextTick(function () {

                Person.findOne({'facebookId': profile.id}, function (err, user) {

                    if (err)
                        return done(err);

                    if (user) {
                        return done(null, user);
                    } else {
                        var newPerson = new Person();
                        newPerson.facebookId = profile.id;
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
    return passport.authenticate('facebook', {scope: 'email', successRedirect: '/'});
};
