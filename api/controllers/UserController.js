/* eslint-disable no-console */
/* eslint-disable no-undef */
/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const UserServices = require('../services/UserServices');

const User = require('../models/User');


const { messages } = sails.config;

const Logger = require('../services/Logger');
const MailService = require('../services/MailService');
const otpGenerator = require('otp-generator');

module.exports = {
  registration(req, res) {
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
  },
  findByEmail(req,res){
    const email = req.allParams().email
   const otp= otpGenerator.generate(4,{digits:true,alphabets:false,upperCase:false,specialChars:false})
   console.log(otp)
   Logger.verbose(otp)
    User.findByEmail(email,(err,user)=>{
      if (err) {
        console.log(err)
        res.send({status:300,message:"Not found"})
      } if (user==null) {
        res.send({status:300,message:"Not found"})
        
      }
       else {
        console.log('user founded')
        if(user[0].isVerified===true){
          res.send({status:301,message:"User already verified"})
        } else{
          MailService.sendMail(email,otp) 
          res.send({status:200,message:"otp sent",user:otp})
        }
        
      }
    })
  },
  verify(req, res) {
    // const uniqueString = req.allParams().uniqueString;
    // Logger.verbose(`unique string -  ${uniqueString}`);
    const id = req.params.uniqueString
    Logger.verbose(`id= ${id}`)
    User.verify(id, (err, verifieduser) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else if (verifieduser === undefined) {
        res.send({ status: 300, user: ' undefined ' });
      } else {
        console.log('successfuly verified');
        // res.send({ status: 200, user: verifieduser });
        res.redirect('http://localhost:8080/restaurants')

      }
    });
  },

};
