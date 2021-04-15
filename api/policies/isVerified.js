const Logger = require('../services/Logger');

module.exports = function isAdmin(req, res, next) {
  Logger.debug('Policy.isVerified');

  if (req.session.user) {
    Logger.verbose(req.session.user);
    if (Object.prototype.hasOwnProperty.call(req.session.user, 'isVerified')) {
      if (req.session.user.isVerified === true) {
        Logger.verbose('in third if');
        return next();
      }
      return res.send({ status: 403, message: 'user not verified' });
    }
    return res.send({ status: 401, message: 'Please login.' });
  }
  return res.send({ status: 401, message: 'Please login.' });
};
