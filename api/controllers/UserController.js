/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const UserServices = require("../services/UserServices");
const messages = sails.config.messages;


module.exports = {
      registration(req, res, next) {
        Logger.verbose('UserController.registration');
        const registrationData = req.body;
        Logger.verbose(registrationData);
        UserServices.registration(registrationData, (err) => {
          if (err) {
            if (err === 'Already Present') {
              res.send({ status: 300, message: messages.alreadyRegisteredUser });
            } else {
              res.send({ status: 300, message: messages.serverError });
            }
          } else {
            res.send({ status: 200, message: messages.registeredUserSuccess });
          }
        });
      }

};

