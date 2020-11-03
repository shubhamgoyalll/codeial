const passport = require('passport');

// using OAuth2 as it is more secure than OAuth1
// to install this npm install passport-google-oauth
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

// install crypto for generating random passwords npm install crypto
const crypto = require('crypto');
const User = require('../models/user');

//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID : "433523056843-mvru11ejh10ermguipkpsnvvkttuje61.apps.googleusercontent.com",
    clientSecret : "sAyUxQy0tlGWJblagwfxycou",
    callbackURL : "http://localhost:8000/users/auth/google/callback",
    },

    function(accessToken, refreshToken, profile, done){
        // find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
         if(err){console.log('Error in google strategy-passport', err); return;}

            console.log(profile);

            if(user){
                // if found, set this user as req.user
                return done(null, user);
            }else{
                // if not found, create a user and set it as req.user
                User.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){console.log('Error in google strategy-passport', err); return;}

                    return done(null, user);
                });
            }
        });
    }

    ));

module.exports = passport;
















