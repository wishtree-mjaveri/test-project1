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
const {responseCodes} = sails.config

const Logger = require('../services/Logger');
const MailService = require('../services/MailService');
const otpGenerator = require('otp-generator');
module.exports = {
 async registration(req, res) {
    Logger.verbose('UserController.registration');
    const registrationData = req.body;
    const {email }= registrationData
    Logger.verbose(registrationData);
    try {
   const user=await User.findByEmail(email)

   if (user) {
          return res.send({status: responseCodes.Conflict, message: messages.alreadyRegisteredUser})
          
   } else {
     
   

  UserServices.registration(registrationData,
//     (err)=>{
// if (err=="Already Present") {
//   Logger.info(err)
//   return res.send({status: responseCodes.Conflict, message: messages.alreadyRegisteredUser})
  
// }
//   })
  ).then(( resp)=>{
    
      // Logger.verbose()
        // if(resp){
        //   Logger.verbose(resp)
        //   if (resp) {
        //   return res.send({status: responseCodes.Conflict, message: messages.alreadyRegisteredUser})
            
        //   }
         
        // }
        Logger.info(resp)
        if(resp){
          return res.send({status: responseCodes.Conflict, message: messages.alreadyRegisteredUser})

        }
        
        else{
          return res.send({status:responseCodes.Created,message:messages.registeredUserSuccess})
          }
        // Logger.verbose(res)
       
      }).catch(err=>{
        if(err=='Already Present'){
          return res.send({status: responseCodes.Conflict, message: messages.alreadyRegisteredUser})

        }
        else{
        Logger.error(`in inner catch ${err}`)
        res.send({ status: responseCodes.ServerError, message: messages.serverError });
        }
      })
      // if (registeredUser=='Already Present') {
      //   return res.send({status: responseCodes.Conflict, message: messages.alreadyRegisteredUser})
      // }
      // return res.send({status:responseCodes.Created,message:messages.registeredUserSuccess})
    }} catch (error) {
        Logger.error(error)
       return res.send({ status: responseCodes.ServerError, message: messages.serverError });
      
      
    }
    // UserServices.registration(registrationData, (err) => {
    //   if (err) {
    //     if (err === 'Already Present') {
    //       res.send({ status: 300, message: messages.alreadyRegisteredUser });
    //     } else {
    //       res.send({ status: 300, message: messages.serverError });
    //     }
    //   } else {
    //     res.send({ status: 200, message: messages.registeredUserSuccess });
    //   }
    // });
  },
  findByEmail(req,res){
    const email = req.allParams().email
   const otp= otpGenerator.generate(4,{digits:true,alphabets:false,upperCase:false,specialChars:false})
   console.log(otp)
   Logger.verbose(otp)
    User.findByEmail(email,(err,user)=>{
      if (err) {
        console.log(err)
       return res.send({status:responseCodes.ServerError,message:err})
      } if (user==null) {
       return res.send({status:responseCodes.ServerError,message:"Not found"})
        
      }
       else {
        console.log('user founded')
        if(user[0].isVerified===true){
         return res.send({status:responseCodes.Conflict,message:"User already verified"})
        } else{
          MailService.sendMail(email,otp) 
         return res.send({status:responseCodes.OK,message:"email sent",user:otp})
        }
        
      }
    })
  },
  async verify(req, res) {
    // const uniqueString = req.allParams().uniqueString;
    // Logger.verbose(`unique string -  ${uniqueString}`);
    const id = req.params.uniqueString
    Logger.verbose(`id= ${id}`)
    try {
      const user = await User.verify(id)
      if (user === undefined) {
       return res.send({ status: responseCodes.Conflict, user: ' User Already Verified ' });
      }else{
        console.log('successfuly verified');
        return res.redirect('http://localhost:8080/restaurants')
      }
     
    } catch (error) {
      Logger.error(`Error in UserController.verify ${error}`)
      return res.send({ status: responseCodes.ServerError,message:error});
      
    }
    // User.verify(id, (err, verifieduser) => {
    //   if (err) {
    //     console.log(err);
    //     res.send(err);
    //   } else if (verifieduser === undefined) {
    //     res.send({ status: 300, user: ' undefined ' });
    //   } else {
    //     console.log('successfuly verified');
    //     // res.send({ status: 200, user: verifieduser });
    //     res.redirect('http://localhost:8080/restaurants')

    //   }
    // });
  },

};
