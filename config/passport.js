const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      bcrypt = require('bcrypt');
const Logger = require('../api/services/Logger')
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
  Logger.verbose(user.id)
  done(null, user.id);
});

passport.deserializeUser((req, id, done) => {
  User.findOne({ id }, (err, userData) => {
    done(err, userData);
  });
});

passport.use(new LocalStrategy({
  usernameField:'email',
  passwordField: 'password',
  
  passReqToCallback: true,
},
((req,email, password, done) => {
  // Logger.verbose(username);
  Logger.verbose(email);
  Logger.verbose(password);
  User.findOne({ email: email}, (err, user) => {
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

