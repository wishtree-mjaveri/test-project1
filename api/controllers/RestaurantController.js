/**
 * RestaurantController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const RestaurantServices = require("../services/RestaurantServices");
const Logger = require("../services/Logger");
const ValidationServices = require("../services/ValidationServices");
const { deleteRestaurant } = require("../services/RestaurantServices");
const { loggers } = require("winston");
const messages = sails.config.messages;
module.exports = {
  registration(req, res) {
    Logger.verbose("RegisterationController.registeration");
    console.log("in controller");
    const registerationData = req.body;
    Logger.verbose(registerationData);

    const args = [
      {
        name: "Restaurant Name",
        value: registerationData.restaurantName,
        validations: [
          { validation: "notEmpty", message: "Restaurant-Name empty" },
        ],
      },
      {
        name: "Restaurant Description",
        value: registerationData.restaurantDescription,
        validations: [
          { validation: "notEmpty", message: "Restaurant-Description empty" },
        ],
      },
      {
        name: "Restaurant OpeningTime",
        value: registerationData.restaurantOpeningTime,
        validations: [
          { validation: "notEmpty", message: "Restaurant-Opening-Time empty" },
        ],
      },
      {
        name: "Restaurant ClosingTime",
        value: registerationData.restaurantClosingTime,
        validations: [
          { validation: "notEmpty", message: "Restaurant-Closing-Time empty" },
        ],
      },
    ];
    ValidationServices.validate(args, (validationError, validationErrMsg) => {
      if (validationError) {
        Logger.error(
          `RestaurantController.registration at ValidationServices.validate${validationError}`
        );
        res.send({ status: 300, message: messages.serverError });
      } else if (validationErrMsg.length == 0) {
        RestaurantServices.registeration(registerationData, (error) => {
          if (error) {
            res.send({ status: 300, message: messages.serverError });
          } else {
            res.send({ status: 200, message: messages.restaurantCreated });
          }
        });
      } else {
        ValidationServices.getValidateMsg(
          validationErrMsg,
          (getValidateMsgErr, errMsgs) => {
            if (getValidateMsgErr) {
              Logger.error(
                `RestaurantController.registeration at ValidateService.getValidateMsg ${getValidateMsgErr}`
              );
              res.send({ status: 300, message: "serverError" });
            } else {
              Logger.verbose(errMsgs);
              res.send({ status: 422, message: errMsgs });
            }
          }
        );
      }
    });
  },

  updateRestaurant(req, res) {
    Logger.verbose("RegisterationController.registeration");
    const restaurantData = req.body;
    Logger.verbose(restaurantData);
    const restaurantId = restaurantData.id;

    Logger.verbose(restaurantId);
    const args = [
      {
        name: "Restaurant Name",
        value: restaurantData.restaurantName,
        validations: [
          { validation: "notEmpty", message: "Restaurant-Name empty" },
        ],
      },
      {
        name: "Restaurant Description",
        value: restaurantData.restaurantDescription,
        validations: [
          { validation: "notEmpty", message: "Restaurant-Description empty" },
        ],
      },
      {
        name: "Restaurant OpeningTime",
        value: restaurantData.restaurantOpeningTime,
        validations: [
          { validation: "notEmpty", message: "Restaurant-Opening-Time empty" },
        ],
      },
      {
        name: "Restaurant ClosingTime",
        value: restaurantData.restaurantClosingTime,
        validations: [
          { validation: "notEmpty", message: "Restaurant-Closing-Time empty" },
        ],
      },
    ];

    ValidationServices.validate(args, (validationError, validationErrMsg) => {
      if (validationError) {
        Logger.error(
          `RestaurantController.updateRestaurant at ValidationServices.validate ${validationError}`
        );
        res.send({ status: 300, message: messages.serverError });
      } else if (validationErrMsg.length == 0) {
        RestaurantServices.updateRestaurant(
          restaurantId,
          restaurantData,
          (error, updatedRestaurant) => {
            if (error) {
              res.send({ status: 300, message: messages.serverError });
            } else {
              Logger.info("restaurant updated successfully");
              res.send({
                status: 200,
                message: messages.updatedRestaurant,
                restaurant: updatedRestaurant,
              });
            }
          }
        );
      } else {
        ValidationServices.getValidateMsg(
          validationErrMsg,
          (getValidateMsgErr, errMsgs) => {
            if (getValidateMsgErr) {
              Logger.error(
                `RestaurantController.registeration at ValidateService.getValidateMsg ${getValidateMsgErr}`
              );
              res.send({ status: 300, message: "serverError" });
            } else {
              Logger.verbose(errMsgs);
              res.send({ status: 422, message: errMsgs });
            }
          }
        );
      }
    });
  },

  getRestaurant(req, res) {
    Logger.verbose("RestaurantController.getRestaurant");

    const id = req.allParams()._id;
    RestaurantServices.getRestaurant(id, (err, restaurantFound) => {
      if (err) {
        res.send({ status: 300, message: messages.serverError });
      } else {
        res.send({
          status: 200,
          message: messages.restaurantFound,
          restaurant: restaurantFound,
        });
      }
    });
  },

  getAllRestaurant(req, res) {
    Logger.verbose("RestaurantController.getAllRestaurant");
    const pagination = req.query.pagination
      ? parseInt(req.query.pagination)
      : 4;
    Logger.verbose("pagination", pagination);
    const page = req.query.page ? parseInt(req.query.page) : 1;
    Logger.verbose("page", page);
    const sortOrder= req.query.order
    Logger.debug("Sort order",sortOrder)
    RestaurantServices.getAllRestaurants(
      page,
      pagination,
      sortOrder,
      (error, restaurantList) => {
        if (error) {
          res.send({ status: 300, message: messages.serverError });
        } else {
          res.send({
            status: 200,
            message: messages.restaurantList,
            list: restaurantList,
          });
        }
      }
    );
  },
  getRestaurants(req, res) {
    Logger.verbose("RestaurantController.getAllRestaurant");

    RestaurantServices.getRestaurants((error, restaurantList) => {
      if (error) {
        res.send({ status: 300, message: messages.serverError });
      } else {
        res.send({
          status: 200,
          message: messages.restaurantList,
          list: restaurantList,
        });
      }
    });
  },

  searchRestaurantsByText(req,res){
      Logger.verbose('RestaurantController.searchRestaurantsByText');
      const searchText = req.allParams().text
      RestaurantServices.searchRestaurantBytext(searchText,(error,restaurantsFound)=>{
        if (error) {
          res.send({status:200,message:messages.serverError})
        } else {
          res.send({
            status:200,
            message:messages.restaurantList,
            restaurants:restaurantsFound
          })
        }
      })
  },

  deleteRestaurant(req, res) {
    Logger.verbose("RestaurantController.deleteRestaurant");
    const restaurantId = req.allParams().uid;
    RestaurantServices.deleteRestaurant(
      restaurantId,{isActive:false},
      (error, deletedRestaurant) => {
        if (error) {
          res.send({ status: 200, message: messages.serverError });
        } else {
          res.send({
            status: 200,
            message: messages.restaurantDeleted,
            restaurant: deletedRestaurant,
          });
        }
      }
    );
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
