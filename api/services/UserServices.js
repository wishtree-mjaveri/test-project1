const bcrypt = require('bcrypt');
const User = require('../models/User');
const Logger = require('./Logger');

module.exports = {
  async registration(registrationData, callback) {
    Logger.verbose('UserService.registration');
    const { email } = registrationData;
    User.findByEmail(email, (err, user) => {
      if (err) {
        Logger.error(`UserService.registration at UserService.findByEmail ${err}`);
        callback(err);
      } else if (user) {
        callback('Already Present');
      } else {
        Logger.verbose('no user exist from this email');
        bcrypt.genSalt(10, (bcryptGenSaltErr, salt) => {
          if (bcryptGenSaltErr) {
            Logger.error('UserService.createUser at bcrypt.genSalt');
            callback(bcryptGenSaltErr);
          } else {
            const { password } = registrationData;
            bcrypt.hash(password, salt, (bcryptErr, hash) => {
              if (bcryptErr) {
                Logger.error('UserService.setPassword at InternalUser.findActiveById userModel password empty');
                callback(bcryptErr);
              } else {
                // eslint-disable-next-line no-param-reassign
                registrationData.password = hash;
                User.createUser(registrationData, (createErr, userData) => {
                  if (createErr) {
                    Logger.error(`UserService.registration at User.create ${createErr}`);
                    callback(createErr);
                  } else {
                    Logger.info('User details saved successfully.');
                    callback(null, userData);
                  }
                });
              }
            });
          }
        });
      }
    });
  },

};
