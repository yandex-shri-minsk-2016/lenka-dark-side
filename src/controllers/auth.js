var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var VKStrategy = require('passport-vkontakte').Strategy;

var Person = require('./../models/person').model;

//var configAuth = require('./auth');
module.exports = function () {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        Person.findOne({facebookId: id}, function(err, user) {
           done(err, user);
        });
    });

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(
        new FacebookStrategy({
            // pull in our app id and secret from our auth.js file
            'clientID': '1055036224558106',
            'clientSecret': 'c4a9c9b0079b319785e5a75f3373c37b',
            'callbackURL': 'http://localhost:3000/auth/fb'
        },

        // facebook will send back the token and profile
        function (token, refreshToken, profile, done) {
            process.nextTick(function () {

                // find the user in the database based on their facebook id
                Person.findOne({'facebookId': profile.id}, function (err, user) {

                    //    // if there is an error, stop everything and return that
                    //     // ie an error connecting to the database
                    if (err)
                        return done(err);

                    // if the user is found, then log them in
                    if (user) {
                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user found with that facebook id, create them
                        var newPerson = new Person();
                        newPerson.facebookId = profile.id;
                        newPerson.name = profile.displayName;
                        // save our user to the database
                        newPerson.save(function (err) {
                            if (err)
                                throw err;

                            // if successful, return the new user
                            return done(null, newPerson);
                        });
                    }
                });


            });
        })
    );
    return passport.authenticate('facebook', {scope: 'email', successRedirect: '/' });
};