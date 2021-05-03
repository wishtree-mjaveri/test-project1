
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Logger = require('../api/services/Logger');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy,
   request = require('request');
  //  const User = require('../api/models/User')

// passport.serializeUser(function(user, cb) {
//   cb(null, user.id);
// });
// passport.deserializeUser(function(id, cb){
//   User.findOne({id}, function(err, users) {
//     cb(err, users);
//   });
// });
// passport.use(new LocalStrategy({
//   emailField: 'email',
//   passwordField: 'password'
// }, function(email, password, cb){
// User.findOne({email: email}, function(err, user){
//     if(err) return cb(err);
//     if(!user) return cb(null, false, {message: 'email not found'});
// bcrypt.compare(password, user.password, function(err, res){
//       if(!res) return cb(null, false, { message: 'Invalid Password' });
// let userDetails = {
//         email: user.email,
//         username: user.username,
//         id: user.id
//       };
// return cb(null, userDetails, { message: 'Login Succesful'});
//     });
//   });
// }));
passport.serializeUser((user, done) => {
  Logger.verbose(user.id);
  done(null, user.id);
});

passport.deserializeUser((req, id, done) => {
  User.findOne({id} , (err, userData) => {
    if (err) {
      Logger.error(err)
    }
    done(err, userData);
  });
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',

  passReqToCallback: true,
},
((req, email, password, done) => {
  // Logger.verbose(username);
  Logger.verbose(email);
  Logger.verbose(password);
  User.findOne({ email }, (err, user) => {
    if (err) {
      Logger.err(`Passport : at User.findOne ${err}`);
      return done(err);
    }
    Logger.verbose(user);
    if (!user) {
      Logger.warn({ message: 'User Incorrect email' });
      return done(null, false, { message: 'Incorrect email' });
    }
    if (!user.password) {
      Logger.warn({ message: 'User Incorrect Password' });
      return done(null, false, { message: 'Incorrect Password' });
    }
    bcrypt.compare(password, user.password, (bcryptErr, res) => {
      if (bcryptErr) {
        return done(bcryptErr);
      }
      if (!res) {
        Logger.warn({ message: 'Res Incorrect Username' });
        return done(null, false, { message: 'Incorrect Password' });
      }
      Logger.info({ message: 'Logged In Successfully' });
      return done(null, user, { message: 'Logged In Successfully' });
    });
  });
})));
var verifyHandler = async function (accessToken, refreshToken, profile, cb, done) {
Logger.info('in verify handler')
  var data = {
    
    // id: cb.id,
    name: cb.displayName,
    email: cb.emails[0].value,
    emailVerified: cb.emails[0].verified,
    // token:accessToken
    // isVerified:true
  };
  const {email} =data
  const userExist = await User.findByEmail(email)
  if (!userExist) {
    const newUser = await User.createUser({
      email:email,
      isVerified:true,
      
    })
    if (newUser) {
      return done(null,newUser)
    } 
  } else {
  return done(null, userExist);
    
  }
};

passport.use(new GoogleStrategy({
  clientID: '206197260501-lu0i11eu48mf62tn885fi3ge3lscjasp.apps.googleusercontent.com',
  clientSecret:'AKF49MXpK08ZdmQfgAIZ0Q5U',
  callbackURL: 'http://localhost:1337/api/v1/auth/google/callback',
  passReqToCallback: true
}, verifyHandler));

var verifyHandler = function(req, token, tokenSecret, profile, done) {

  process.nextTick(function() {
    var url = 'https://graph.facebook.com/v2.10/me?access_token=%s&fields=id,email,first_name,last_name';
    url = url.replace('%s', token);

    var options = {method: 'GET', url: url, json: true};
    request(options, function (err, response) {
      if (err) {
        return done(null, null);
      }

      var data = {
        id: response.body.id,
        first_name: response.body.first_name,
        last_name: response.body.last_name,
        email: response.body.email
      };

      return done(null, data);
    });
  });
};

passport.use(new FacebookStrategy({
  clientID: '139262834844372',
  clientSecret: '30d8a53ebc7b6a1a196fb3c08c7f9e4b',
  callbackURL: 'http://localhost:1337/api/v1/auth/facebook/callback',
  passReqToCallback: true
}, verifyHandler));
