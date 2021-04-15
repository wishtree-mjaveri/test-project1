const Logger = require('../services/Logger');

module.exports = function isAdmin(req, res, next) {
  Logger.debug('Policy.isAdmin');

  if (req.session.user) {
    Logger.verbose(req.session.user);
    if (Object.prototype.hasOwnProperty.call(req.session.user, 'role')) {
      if (req.session.user.role === 'Admin') {
        Logger.verbose('in third if');
        return next();
      }
      return res.send({ status: 403, message: 'You are not authorized to view this page or resource.' });
    }
    return res.send({ status: 401, message: 'Please login.' });
  }
  return res.send({ status: 401, message: 'Please login.' });
};
