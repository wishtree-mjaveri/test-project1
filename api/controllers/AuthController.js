/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-undef */
/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const passport = require('passport');
const Logger = require('../services/Logger');

const { messages } = sails.config;
module.exports = {
  login(req, res) {
    Logger.debug('AuthController.login');
    Logger.verbose(req.body);
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        Logger.error(`AuthController.login at passport.authenticarte ${err}`);
        return res.send({ status: 300, message: messages.loginError, user: null });
      }
      if (!user) {
        Logger.verbose('User not found');
        return res.send({ status: 301, message: info.message, user: null });
      }
      req.logIn(user, (logInErr) => {
        if (logInErr) {
          Logger.error(`AuthController.login at req.logIn ${logInErr}`);
          return res.send({ status: 300, message: messages.serverError, user: null });
        }

        Logger.verbose(req.session);

        req.session.user = { id: user.id, email: user.email, role: user.role ,isVerified:user.isVerified};

        Logger.verbose(req.session.user);
        /*
              Like this you can create signed and secure cookies
              res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000, signed:true, secure:true});

            */

        Logger.info('Login successfully');
        return res.json({ status: 200, message: messages.loginSuccess, user: { email: user.email, role: user.role ,isVerified:user.isVerified} });
      });
    })(req, res);
  },
  logout(req, res) {
    Logger.verbose('AuthController.logout');
    req.session.destroy();

    return res.send({ status: 200, message: messages.logoutSucess });
  },
  googleAuth: function(req, res) {
    Logger.info('googleAuth method')
    passport.authenticate('google', { scope: ['email'] },{session:true})(req, res);
  },

  googleCallback: function(req, res, next) {
    Logger.info('googleCallback method')
    passport.authenticate('google', function(err, user) {
      if(err) {
        // redirect to login page
        console.log('google callback error: '+err);
      } else {
        console.log('google credentials');
        console.log(user);
        const {email,token} = user 
        
      //  const userexist = await User.findByEmail(email)
        
        // Logger.verbose(userexist)
        // if (userexist==null) {
        //   // res.send({status:401,message:"User not registered.Please do registration first"})
        //   res.redirect(301,'http://localhost:8080/restaurants')
        // } else {
          
        res.redirect(`http://localhost:8080/userhomepage`)
          
        // }
        // req.session.user = {email:user.email,isVerified:user.emailVerified}
        // Logger.verbose(req.session.user)
        // // res.json(user);
        // res.redirect('http://localhost:8080/userhomepage')

      }
    },{session:true})(req, res, next);
  },
  facebookAuth: function(req, res, next) {
    passport.authenticate('facebook', { scope: ['email']})(req, res, next);
  },

  facebookCallback: function(req, res, next) {
    passport.authenticate('facebook', function(err, user) {

      console.log('facebook credentials');
      console.log(user);
     res.redirect('http://localhost:8080/userhomepage');

    })(req, res, next);
  },

};
