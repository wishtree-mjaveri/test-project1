declare var sails: any;
declare var Logger: any;

import * as passport from 'passport'
// const fs = require('fs');

const messages = sails.config.messages;

module.exports = {

  isAuthenticated(req:any, res:any) {
    Logger.debug('AuthController.isAuthenticated');
    if (req.isAuthenticated()) {
      req.session.authenticated = true;
      const user = req.user;
      req.session.user = {};
      req.session.user.id = user.id;
      req.session.user.role = user.role;
      req.session.user.firstName = user.firstName;
      req.session.user.lastName = user.lastName;
      return res.send({ status: 200 });
    }
    if (req.xhr) {
      return res.send({ status: 300, message: messages.sessionExpired });
    }
    if (req.session.authenticated === undefined) {
      return res.send({ status: 300, message: messages.pleaseLogin });
    }
    return res.send({ status: 300, message: messages.sessionExpired });
  },

  login(req:any, res:any) {
    Logger.debug('AuthController.login');
    Logger.verbose(req.body); 
    passport.authenticate('local', (err:any, user:any, info:any) => {
      if (err) {
        Logger.error(`AuthController.login at passport.authenticarte ${err}`);
        return res.send({ status: 300, message: messages.loginError, user: null });
      }
      if (!user) {
        Logger.verbose('User not found');
        return res.send({ status: 300, message: info.message, user: null });
      }
      req.logIn(user, (logInErr) => {
        if (logInErr) {
          Logger.error(`AuthController.login at req.logIn ${logInErr}`);
          return res.send({ status: 300, message: messages.serverError, user: null });
        }
        req.session.user = { id: user.id };
        /*
          Like this you can create signed and secure cookies
          res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000, signed:true, secure:true});

        */

        Logger.info('Login successfully');
        return res.send({ status: 200, message: messages.loginSuccess, user });
      });
    })(req, res);
  },

  logout(req, res) {
    Logger.debug('AuthController.logout');
    req.session.destroy();
    // delete req.logout();
    return res.send({ status: 200, message: messages.logoutSucess });
  },

  verifyCaptcha(req:any, res:any) {
    Logger.debug('AuthController.verifyCaptcha');
    req.session.user.ratelimitexceeded = false;
    return res.send({ status: 200 });
  },

  facebookAuth(req:any, res:any,next:Function) {
    Logger.verbose('facebookAuth');
    passport.authenticate('facebook', { scope: ['email'] })(req, res, next);
  },

  facebookCallback(req:any, res:any,next:Function) {
    passport.authenticate('facebook', (err:any, user:any) => {
      console.log('facebook credentials');
      console.log(user);
      res.json(user);
    })(req, res, next);
  },
};
