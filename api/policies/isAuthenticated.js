const Logger = require('../services/Logger')
const messages = sails.config.messages;
module.exports = function isAuthenticated(req, res,next) {
    Logger.debug('AuthController.isAuthenticated');
    if (req.isAuthenticated()) {
      req.session.authenticated = true;
      const user = req.user;
    //   req.session.user = {};
    //   req.session.user.id = user.id;
    //   req.session.user.username = user.username;
    //   req.session.user.email = user.email;
    //   req.session.user.password = user.password;
      return next();
    }
    if (req.xhr) {
      return res.send({ status: 300, message: messages.sessionExpired });
    }
    if (req.session.authenticated === undefined) {
      return res.send({ status: 300, message: messages.pleaseLogin });
    }
    return res.send({ status: 300, message: messages.sessionExpired });
  }
