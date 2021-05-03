const bcrypt = require('bcrypt');
const User = require('../models/User');
const Logger = require('./Logger');

const { messages } = sails.config;
const {responseCodes} = sails.config
module.exports = {
async registration(registrationData,callback) {
    Logger.verbose('UserService.registration');
    const { email } = registrationData;
    let val;
    try {
     const user = await  User.findByEmail(email)
    .then(result=>{
      if (result) {
        Logger.verbose(`in service ${result}`)
        Logger.info(result)
        // const userEMail = result[0].email
        // return result
        val=true
      } else {
        Logger.verbose('no user exist from this email');
        val=false
        // bcrypt.genSalt(10)
        // .then(
        //   res=>{
        //     const { password } = registrationData;
        //     bcrypt.hash(password, 10)
        //     .then(res=>{
        //       registrationData.password = hash;
        //       try {
        //         const user =  User.createUser(registrationData)
        //         return user
        //       } catch (error) {
        //         Logger.error(`Error in UserService.registration ${error}`)
        //         return error                 
        //       }
        //     })
        //     .catch(err=>{
        //       Logger.error(`UserService.setPassword at InternalUser.findActiveById userModel password empty  ${err}`)
        //       return err
        //     })

        //   }
        // )
        // .catch(err=>{
        //   Logger.error(`UserService.createUser at bcrypt.genSalt ${err}`);
        //   return err
        // })
            const { password } = registrationData;

        bcrypt.hash(password, 10)
            .then(res=>{
              registrationData.password = res;
              try {
                const user =  User.createUser(registrationData).then(
                  res=>{
                    Logger.info('User Created')
                    Logger.verbose(res)
                    return res

                  }
                )
                .catch(err=>{
                  console.log(err)
                })
              } catch (error) {
                Logger.error(`Error in UserService.registration ${error}`)
                return error                 
              }
            })
            .catch(err=>{
              Logger.error(`UserService.setPassword at InternalUser.findActiveById userModel password empty  ${err}`)
              return err
            })
        
      }
      
    })
   
    .catch(error=>{
      Logger.error(`UserService.registration at UserService.findByEmail ${error}`);

      return error
    })
    // User.findByEmail(email, (err, user) => {
    //   if (err) {
    //     Logger.error(`UserService.registration at UserService.findByEmail ${err}`);
    //     callback(err);
    //   } else if (user) {
    //     callback('Already Present');
    //   } else {
    //     Logger.verbose('no user exist from this email');
    //     bcrypt.genSalt(10, (bcryptGenSaltErr, salt) => {
    //       if (bcryptGenSaltErr) {
    //        Logger.error('UserService.createUser at bcrypt.genSalt');
    //         callback(bcryptGenSaltErr);
    //       } else {
    //         const { password } = registrationData;
    //         bcrypt.hash(password, salt, async (bcryptErr, hash) => {
    //           if (bcryptErr) {
    //             Logger.error('UserService.setPassword at InternalUser.findActiveById userModel password empty');
    //             callback(bcryptErr);
    //           } else {
    //             // eslint-disable-next-line no-param-reassign
    //             registrationData.password = hash;
    //             try {
    //               const user = await User.createUser(registrationData)
    //               return user
    //             } catch (error) {
    //               Logger.errocallback(r(`Error in UserService.registration ${error}`)
    //               return error                 
    //             }
    //             // User.createUser(registrationData, (createErr, userData) => {
    //             //   if (createErr) {
    //             //     Logger.error(`UserService.registration at User.create ${createErr}`);
    //             //     callback(createErr);
    //             //   } else {
    //             //     Logger.info('User details saved successfully.');
    //             //     callback(null, userData);
    //             //   }
    //             // });
    //           }
    //         });
    //       }
    //     });
    //   }
    // });
  // return result
  Logger.verbose(user)
  return user
    } catch (error) {
      console.log(err)
      return error
    }
  // const result= await User.findByEmail(email)
  //   .then(result=>{
  //     if (result.email.length>0) {
  //       Logger.verbose(`in service ${result[0]}`)
  //       Logger.info(result)
  //       // const userEMail = result[0].email
  //     //  return result;
  //     } else {
  //       Logger.verbose('no user exist from this email');
  //       // bcrypt.genSalt(10)
  //       // .then(
  //       //   res=>{
  //       //     const { password } = registrationData;
  //       //     bcrypt.hash(password, 10)
  //       //     .then(res=>{
  //       //       registrationData.password = hash;
  //       //       try {
  //       //         const user =  User.createUser(registrationData)
  //       //         return user
  //       //       } catch (error) {
  //       //         Logger.error(`Error in UserService.registration ${error}`)
  //       //         return error                 
  //       //       }
  //       //     })
  //       //     .catch(err=>{
  //       //       Logger.error(`UserService.setPassword at InternalUser.findActiveById userModel password empty  ${err}`)
  //       //       return err
  //       //     })

  //       //   }
  //       // )
  //       // .catch(err=>{
  //       //   Logger.error(`UserService.createUser at bcrypt.genSalt ${err}`);
  //       //   return err
  //       // })
  //           const { password } = registrationData;

  //       bcrypt.hash(password, 10)
  //           .then(res=>{
  //             registrationData.password = res;
  //             try {
  //               const user =  User.createUser(registrationData).then(
  //                 res=>{
  //                   Logger.info('User Created')
  //                   Logger.verbose(res)
  //                   return res

  //                 }
  //               )
  //               .catch(err=>{
  //                 console.log(err)
  //               })
  //             } catch (error) {
  //               Logger.error(`Error in UserService.registration ${error}`)
  //               return error                 
  //             }
  //           })
  //           .catch(err=>{
  //             Logger.error(`UserService.setPassword at InternalUser.findActiveById userModel password empty  ${err}`)
  //             return err
  //           })
        
  //     }
  //   })
   
  //   .catch(error=>{
  //     Logger.error(`UserService.registration at UserService.findByEmail ${error}`);

  //     return error
  //   })
  //   // User.findByEmail(email, (err, user) => {
  //   //   if (err) {
  //   //     Logger.error(`UserService.registration at UserService.findByEmail ${err}`);
  //   //     callback(err);
  //   //   } else if (user) {
  //   //     callback('Already Present');
  //   //   } else {
  //   //     Logger.verbose('no user exist from this email');
  //   //     bcrypt.genSalt(10, (bcryptGenSaltErr, salt) => {
  //   //       if (bcryptGenSaltErr) {
  //   //        Logger.error('UserService.createUser at bcrypt.genSalt');
  //   //         callback(bcryptGenSaltErr);
  //   //       } else {
  //   //         const { password } = registrationData;
  //   //         bcrypt.hash(password, salt, async (bcryptErr, hash) => {
  //   //           if (bcryptErr) {
  //   //             Logger.error('UserService.setPassword at InternalUser.findActiveById userModel password empty');
  //   //             callback(bcryptErr);
  //   //           } else {
  //   //             // eslint-disable-next-line no-param-reassign
  //   //             registrationData.password = hash;
  //   //             try {
  //   //               const user = await User.createUser(registrationData)
  //   //               return user
  //   //             } catch (error) {
  //   //               Logger.errocallback(r(`Error in UserService.registration ${error}`)
  //   //               return error                 
  //   //             }
  //   //             // User.createUser(registrationData, (createErr, userData) => {
  //   //             //   if (createErr) {
  //   //             //     Logger.error(`UserService.registration at User.create ${createErr}`);
  //   //             //     callback(createErr);
  //   //             //   } else {
  //   //             //     Logger.info('User details saved successfully.');
  //   //             //     callback(null, userData);
  //   //             //   }
  //   //             // });
  //   //           }
  //   //         });
  //   //       }
  //   //     });
  //   //   }
  //   // });
  // },
  }
}