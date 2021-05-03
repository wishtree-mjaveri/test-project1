// 'use strict';

// var passport = require('passport'),
//   GoogleStrategy = require('passport-google-oauth20').Strategy;

// //var verifyHandler = function(req, token, tokenSecret, profile, done) {
// var verifyHandler = function (accessToken, refreshToken, profile, cb, done) {

//   var data = {
//     id: cb.id,
//     name: cb.displayName,
//     email: cb.emails[0].value,
//     // emailVerified: cb.emails[0].verified
//     isVerified:true
//   };

//   return done(null, data);
// };

// passport.use(new GoogleStrategy({
//   clientID: '206197260501-lu0i11eu48mf62tn885fi3ge3lscjasp.apps.googleusercontent.com',
//   clientSecret:'AKF49MXpK08ZdmQfgAIZ0Q5U',
//   callbackURL: 'http://localhost:1337/api/v1/auth/google/callback',
//   passReqToCallback: true
// }, verifyHandler));