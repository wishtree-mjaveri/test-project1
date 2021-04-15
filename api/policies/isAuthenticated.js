const Logger = require('../services/Logger');
const RedisService = require('../services/RedisService')
const { messages } = sails.config;
module.exports = function isAuthenticated(req, res, next) {
  Logger.debug('isAuthenticated.js');
  if (req.isAuthenticated()) {
    Logger.verbose('in if isauth.js');
    const user = req.user;
    console.log(user)
    req.session.authenticated = true;
    req.session.user = user;
    // const { user } = req;
    //   req.session.user = {};
    //   req.session.user.id = user.id;
    //   req.session.user.username = user.username;
    //   req.session.user.email = user.email;
    //   req.session.user.password = user.password;
    console.log(req.session);
    res.locals.user = {};

    RedisService.getUser(user.id, (err, userObj) => {
      if (err) {
        return res.send({ status: 401, message: 'Please login.' });
      }
      if (userObj != null) {
        if (!userObj.isVerified) {
          return res.send({ status: 401, message: 'Please login.' });
        }
        res.locals.user = userObj;
        console.log(res.locals.user)
         return next();
      }
      return res.send({ status: 401, message: 'The user session has expired. Please login!' });
    });
   
  } else{
  if (req.xhr) {
    Logger.warn('isAuthenticated.js xhr');
    return res.send({ status: 300, message: messages.sessionExpired });
  }
  if (req.session.authenticated === undefined) {
    Logger.warn('isAuthenticated.js authenticated===undefined');

    return res.send({ status: 300, message: messages.pleaseLogin });
  }
  // Logger.warn('isAuthenticated.js session expired');
  // return res.send({ status: 300, message: messages.sessionExpired });
}};
