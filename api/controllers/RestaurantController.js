/* eslint-disable max-len */
/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
/* eslint-disable eqeqeq */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/**
 * RestaurantController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { loggers } = require('winston');
const RestaurantServices = require('../services/RestaurantServices');
const Logger = require('../services/Logger');
const ValidationServices = require('../services/ValidationServices');
const { deleteRestaurant } = require('../services/RestaurantServices');

const { messages } = sails.config;
const { responseCodes } =sails.config
module.exports = {
 async registration(req, res) {
    Logger.verbose('RegisterationController.registeration');
    console.log('in controller');
    const registerationData = req.body;
    Logger.debug(registerationData);

    const args = [
      {
        name: 'Restaurant Name',
        value: registerationData.restaurantName,
        validations: [
          { validation: 'notEmpty', message: messages.restaurantNameEmpty },
        ],
      },
      {
        name: 'Restaurant Description',
        value: registerationData.restaurantDescription,
        validations: [
          { validation: 'notEmpty', message: messages.restaurantDescriptionEmpty },
        ],
      },
      {
        name: 'Restaurant OpeningTime',
        value: registerationData.restaurantOpeningTime,
        validations: [
          { validation: 'notEmpty', message: messages.restaurantOpeningTimeEmpty },
        ],
      },
      {
        name: 'Restaurant ClosingTime',
        value: registerationData.restaurantClosingTime,
        validations: [
          { validation: 'notEmpty', message: messages.restaurantClosingTimeEmpty },
        ],
      },
    ]
    
 ValidationServices.validate( args, async (validationError, validationErrMsg)=> { 
      if (validationError) {
        Logger.error(
          `RestaurantController.registration at ValidationServices.validate${validationError}`,
        );
        res.send({ status: responseCodes.ServerError, message: messages.serverError });
      } else if (validationErrMsg.length == 0) {
        try {
          const restaurant = await RestaurantServices.registeration(registerationData)
          .then(result=>{
            return res.send({status:responseCodes.Created,message:messages.restaurantCreated})

          })
          .catch(error=>{
            Logger.error(`${error}`)
            return res.send({status:responseCodes.serverError,message:error})
          })
        } catch (error) {
          Logger.error(`${error}`)
          return res.send({status:responseCodes.serverError,message:error})
        }
        // RestaurantServices.registeration(registerationData, (error) => {
        //   if (error) {
        //     res.send({ status: 300, message: messages.serverError });
        //   } else {
        //     res.send({ status: 200, message: messages.restaurantCreated });
        //   }
        // });
      } else {
        ValidationServices.getValidateMsg(
          validationErrMsg,
          (getValidateMsgErr, errMsgs) => {
            if (getValidateMsgErr) {
              Logger.error(
                `RestaurantController.registeration at ValidateService.getValidateMsg ${getValidateMsgErr}`,
              );
              res.send({ status: responseCodes.ServerError, message: 'serverError' });
            } else {
              Logger.verbose(errMsgs);
              res.send({ status: 422, message: errMsgs });
            }
          },
        );
      }
    });
  },

 async updateRestaurant(req, res) {
    Logger.verbose('RegisterationController.updateRestaurant');
    const restaurantData = req.body;
    Logger.debug(restaurantData);
    const restaurantId = restaurantData.id;

    Logger.verbose(restaurantId);
    const args = [
      {
        name: 'Restaurant Name',
        value: restaurantData.restaurantName,
        validations: [
          { validation: 'notEmpty', message: messages.restaurantNameEmpty },
        ],
      },
      {
        name: 'Restaurant Description',
        value: restaurantData.restaurantDescription,
        validations: [
          { validation: 'notEmpty', message: messages.restaurantDescriptionEmpty },
        ],
      },
      {
        name: 'Restaurant OpeningTime',
        value: restaurantData.restaurantOpeningTime,
        validations: [
          { validation: 'notEmpty', message: messages.restaurantOpeningTimeEmpty },
        ],
      },
      {
        name: 'Restaurant ClosingTime',
        value: restaurantData.restaurantClosingTime,
        validations: [
          { validation: 'notEmpty', message: messages.restaurantClosingTimeEmpty },
        ],
      },
    ];

    ValidationServices.validate(args,async (validationError, validationErrMsg) => {
      if (validationError) {
        Logger.error(
          `RestaurantController.updateRestaurant at ValidationServices.validate ${validationError}`,
        );
        res.send({ status: 300, message: messages.serverError });
      } else if (validationErrMsg.length == 0) {
        try {
        const restaurant = RestaurantServices.updateRestaurant(restaurantId,restaurantData).
        then(result=>{
        Logger.info('Restaurant Update Successfully')
        return res.send({status:responseCodes.Created,message:messages.restaurantUpdated,UpdateRestaurant:result})

        })
        .catch(err=>{
          Logger.error(`${err}`)
          return res.send({status:responseCodes.ServerError,message:"Server error"})  
        })

        } catch (error) {
          Logger.error(`Error in RestaurantController ${error}`)
          return res.send({status:responseCodes.ServerError,message:error})          
        }

        // RestaurantServices.updateRestaurant(
        //   restaurantId,
        //   restaurantData,
        //   (error, updatedRestaurant) => {
        //     if (error) {
        //       res.send({ status: 300, message: messages.serverError });
        //     } else {
        //       Logger.info('restaurant updated successfully');
        //       res.send({
        //         status: 200,
        //         message: messages.updatedRestaurant,
        //         restaurant: updatedRestaurant,
        //       });
        //     }
        //   },
        // );
      } else {
        ValidationServices.getValidateMsg(
          validationErrMsg,
          (getValidateMsgErr, errMsgs) => {
            if (getValidateMsgErr) {
              Logger.error(
                `RestaurantController.registeration at ValidateService.getValidateMsg ${getValidateMsgErr}`,
              );
              res.send({ status: responseCodes.serverError, message: 'serverError' });
            } else {
              Logger.verbose(errMsgs);
              res.send({ status: 422, message: errMsgs });
            }
          },
        );
      }
    });
  },

  async getRestaurant(req, res) {
    Logger.verbose('RestaurantController.getRestaurant');

    
    const id = req.allParams().uid
    Logger.info(id)
    try {
      const restaurant = await RestaurantServices.getRestaurant(id)
      .then(result=>{
        if (result[0]==null||result[0]==undefined) {
          return res.json({
          message: "No restaurant found",

          })
        }
        Logger.verbose("in controller")
        Logger.info(result)
        return res.send({
          status: responseCodes.OK,
          message: messages.restaurantFound,
          restaurant: result,
            // name: result.restaurantName, description: result.restaurantDescription, address: result.restaurantAddress, image: result.image, openingTime: result.restaurantOpeningTime, closingTime: result.restaurantClosingTime, uid: result.uid,
          // name:result.restaurantName,description: result.restaurantDescription
        
        });
      })
      .catch(error=>{
        Logger.error(`Error from inside of RestaurantController.getRestaurant  ${error}`)
        return res.send({
          status:responseCodes.ServerError,
          error:error
        });
      })
    
    } catch (error) {
      Logger.error(`Error from RestaurantController ${error}`)
      return res.send({
        status:responseCodes.ServerError,
        error:error
      });
    }
    // RestaurantServices.getRestaurant(id, (err, restaurantFound) => {
    //   if (err) {
    //     // res.send({ status: 300, message: messages.serverError });
    //     res.serverError(err);
    //   } else {
    //     res.json({
    //       status: 200,
    //       message: messages.restaurantFound,
    //       restaurant: {
    //         name: restaurantFound.restaurantName, description: restaurantFound.restaurantDescription, address: restaurantFound.restaurantAddress, image: restaurantFound.image, openingTime: restaurantFound.restaurantOpeningTime, closingTime: restaurantFound.restaurantClosingTime, uid: restaurantFound.uid,
    //       },
    //     });
    //   }
    // });
  },

  async getAllRestaurant(req, res) {
    Logger.verbose('RestaurantController.getAllRestaurant');
    const pagination = req.query.pagination
      ? parseInt(req.query.pagination)
      : 4;
    Logger.verbose('pagination', pagination);
    const page = req.query.page ? parseInt(req.query.page) : 1;
    Logger.verbose('page', page);
    const sortOrder = req.query.order;
    Logger.debug('Sort order', sortOrder);
    try {
      const restaurants =  RestaurantServices.getAllRestaurants(page,pagination,sortOrder)
      .then(result=>{
        Logger.info("All restaurants fetched successfully.")
        return res.send({status:responseCodes.OK,message:messages.restaurantList,restaurants:result})

      })
      .catch(error=>{
        Logger.error(`Error in RestaurantController.getAllRestaurants ${error}`)
        return res.send({
          status:responseCodes.ServerError,
          error:error
        });
      })
    } catch (error) {
      Logger.error(`Error in RestaurantController.getAllRestaurants ${error}`)
      return res.send({
        status:responseCodes.ServerError,
        error:error
      });
    }
    // RestaurantServices.getAllRestaurants(
    //   page,
    //   pagination,
    //   sortOrder,
    //   (error, restaurantList) => {
    //     if (error) {
    //       res.send({ status: 300, message: messages.serverError });
    //     } else {
    //       res.send({
    //         status: 200,
    //         message: messages.restaurantList,
    //         list: restaurantList,
    //       });
    //     }
    //   },
    // );
  },
 async getRestaurants(req, res) {
try {
  Logger.verbose('RestaurantController.getAllRestaurant');
    const restaurants = await RestaurantServices.getRestaurants()
    .then(result=>{
      Logger.info('Restaurant fetched successfully.')
      return res.send({status:responseCodes.OK,message:messages.restaurantList,list:result})

    })
    .catch(error=>{
      Logger.error(`Error in RestaurantController.getRestaurants =>${error} `)
  return res.send({ status: responseCodes.ServerError, message: messages.serverError })

    });

} catch (error) {
  return res.send({ status: responseCodes.ServerError, message: messages.serverError })
}
  



    // RestaurantServices.getRestaurants((error, restaurantList) => {
    //   if (error) {
    //     res.send({ status: 300, message: messages.serverError });
    //   } else {
    //     res.send({
    //       status: 200,
    //       message: messages.restaurantList,
    //       list: restaurantList
    //       ,
    //     });
    //   }
    // });
  },

  async searchRestaurantsByText(req, res) {
    Logger.verbose('RestaurantController.searchRestaurantsByText');
    const searchText = req.allParams().text;
    try {
      const restaurants =  RestaurantServices.searchRestaurantBytext(searchText)
      .then(result=>{
      return res.send({status:responseCodes.OK,message:messages.restaurantList,restaurantList:result})
        
      })
      .catch(error=>{
        Logger.error(`Error in RestaurantController.searchRestaurantByText${error}`)
        return res.send({status:responseCodes.ServerError,message:error});
      })
    } catch (error) {
      Logger.error(`Error in RestaurantController.searchRestaurantByText${error}`)
      return res.send({status:responseCodes.ServerError,message:error});
    }
//     RestaurantServices.searchRestaurantBytext(searchText, (error, restaurantsFound) => {
//       if (error) {
//    res.send({ status: 200, message: messages.serverError });
//         ;
//       } else {
//  res.send({
//           status: 200,
//           message: messages.restaurantList,
//           restaurants: restaurantsFound,
//         });
        
//       }
//     });
  },

  async deleteRestaurant(req, res) {
    Logger.verbose('RestaurantController.deleteRestaurant');
    const restaurantId = req.allParams().uid;
    try {
      const restaurant =  RestaurantServices.deleteRestaurant(restaurantId,{isActive:false})
      .then(result=>{ 
        if (result==undefined) {
          return res.send({status:responseCodes.ServerError,
            message:"Restaurant do not exist",
            
          })
        } else{
          return res.send({status:responseCodes.OK,
            message:messages.restaurantDeleted,
            deletedRestaurant:result
          })
        }
       })
     
.catch(error=>{
        Logger.error(`Error in RestaurantController.deleteRestaurant ${error}`)
        return res.send({status:responseCodes.ServerError,message:error});
      })
    
    } catch (error) {
      Logger.error(`Error in RestaurantController.deleteRestaurant ${error}`)
      return res.send({status:responseCodes.ServerError,message:error});
    }
    // RestaurantServices.deleteRestaurant(
    //   restaurantId, { isActive: false },
    //   (error, deletedRestaurant) => {
    //     if (error) {
    //      return res.send({ status: 200, message: messages.serverError });
    //     } else {
    //      return res.send({
    //         status: 200,
    //         message: messages.restaurantDeleted,
    //         restaurant: deletedRestaurant,
    //       });
    //     }
    //   },
    // );
  },

  // setRestaurantRating(req,res){
  //   Logger.verbose('RestaurantController.getRating')
  //   const restaurantId = req.body.id
  //   const totalRating=req.body.rating
  //   const email = req.body.email
  //   const userData={totalRating,email}
  //   RestaurantServices.setRestaurantRating(restaurantId,userData,(error,updatedRestaurant)=>{
  //     if (error) {
  //       res.send({status:300,message:messages.serverError})
  //     } else {
  //       res.send({status:200,message:"restaurant rating added successfully"})
  //     }
  //   })
  // }
};
