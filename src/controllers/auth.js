var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var VKStrategy = require('passport-vkontakte').Strategy;
var Person = require('./../models/person').model;

var host = process.env.HOST || 'http://localhost:3000'

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    Person.findOne({_id: id}, function(err, user) {
       done(err, user);
    });
});
passport.use('facebook',
    new FacebookStrategy({
        'clientID': '1055036224558106',
        'clientSecret': 'c4a9c9b0079b319785e5a75f3373c37b',
        'callbackURL': host + '/auth/fb'
    },
    function (token, refreshToken, profile, done) {
        process.nextTick(function () {
            Person.findOne({facebookId: profile.id}, function (err, user) {
                if (err)
                    return done(err);

                if (user) {
                    return done(null, user);
                } else {
                    var newPerson = new Person();
                    newPerson.facebookId = profile.id;
                    newPerson.name = profile.displayName;
                    newPerson.avatar = "https://graph.facebook.com/" + profile.username + "/picture" + "?width=200&height=200" + "&access_token=" + token;
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

passport.use('vk',
    new VKStrategy({
        'clientID': '5444257',
        'clientSecret': '23fIOGbDEV77oxLIOuOL',
        'callbackURL': host + '/auth/vk'
    },
    function (token, refreshToken, profile, done) {
        process.nextTick(function () {

            Person.findOne({vkId: profile.id}, function (err, user) {
                if (err)
                    return done(err);

                if (user) {
                    return done(null, user);
                } else {
                    var newPerson = new Person();
                    newPerson.vkId = profile.id;
                    newPerson.name = profile.displayName;
                    newPerson.avatar = profile.photos[0].value;
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
