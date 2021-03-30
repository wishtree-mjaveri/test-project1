const Logger = require('../services/Logger')
const messages = sails.config.messages;
module.exports = function isAuthenticated(req, res,next) {
    Logger.debug('isAuthenticated.js');
    if (req.isAuthenticated()) {
      Logger.verbose('in if isauth.js')
      req.session.authenticated = true;
      const user = req.user;
    //   req.session.user = {};
    //   req.session.user.id = user.id;
    //   req.session.user.username = user.username;
    //   req.session.user.email = user.email;
    //   req.session.user.password = user.password;
    console.log(req.session)
      return next();
    }
    if (req.xhr) {
      Logger.warn('isAuthenticated.js xhr')
      return res.send({ status: 300, message: messages.sessionExpired });
    }
    if (req.session.authenticated === undefined) {
      Logger.warn('isAuthenticated.js authenticated===undefined')

      return res.send({ status: 300, message: messages.pleaseLogin });
    }
    Logger.warn('isAuthenticated.js session expired')
    return res.send({ status: 300, message: messages.sessionExpired });
  }
