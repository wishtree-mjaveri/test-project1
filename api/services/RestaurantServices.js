/* eslint-disable no-console */
/* eslint-disable max-len */
// const { loggers } = require('winston');
const { loggers } = require('winston');
const Restaurant = require('../models/Restaurant');
const Logger = require('./Logger');

module.exports = {
  async registeration(registerationData, callback) {
    Logger.debug('in service');
    // logger.verbose('RegisterationService.registeration')
    try {
    const restaurant  = await Restaurant.createRestaurant(registerationData)
    return restaurant      
    } catch (error) {
      return error;
    }
    // Restaurant.createRestaurant(registerationData, (error, restaurantData) => {
    //   if (error) {
    //     // Logger.error(`RestaurantService.registeration at create ${createErr}`),
    //     console.log('in service error ');
    //     callback(error);
    //   } else {
    //     // logger.info('Restaurant details saved successfully')
    //    callback(null, restaurantData);
    //   }
    // });
  },

  async getRestaurant(id) {
    Logger.debug('RestaurantServices.getRestaurant');
    try {
      const restaurant =  await Restaurant.getRestaurant(id)
      // .then(result=>{
      //   Logger.info("Restarant in sercives file")
      //   return result;

      // })
      // .catch(error=>{
      //   return error
      // })
      Logger.verbose('in service')
      Logger.info(restaurant)
      return restaurant
      
    } catch (error) {
      Logger.error(`Error in RestaurantService.getRestaurant  ${error}`)
      return error;
    }
    // Restaurant.getRestaurant(id, (error, restaurantFound) => {
    //   if (error) {
    //     callback(error);
    //   } else {
    //     callback(null, restaurantFound);
    //   }
    // });
  },

  async getAllRestaurants(page, pagination, sortOrder) {
    Logger.debug('RestaurantServices.getALlRestaurant');
    try {
      const allRestaurants = await Restaurant.getAllRestaurants(page,pagination,sortOrder);
      return allRestaurants;
    } catch (error) {
      Logger.error(`Error from RestaurantServices.getAllRestaurant ${error}`)
      return error;
    }

    // Restaurant.getAllRestaurants(page, pagination, sortOrder, (error, restaurantList) => {
    //   if (error) {
    //     callback(error);
    //   } else {
    //     callback(null, restaurantList);
    //   }
    // });
  },
  async getRestaurants(callback) {
    Logger.debug('RestaurantServices.getALlRestaurant');
    try {
      const restaurants = Restaurant.getRestaurants()
      return restaurants
    } catch (error) {
      Logger.error(`Error from RestaurantServices.getAllRestaurant ${error}`)
      return error
    }
    // Restaurant.getRestaurants((error, restaurantList) => {
    //   if (error) {
    //     callback(error);
    //   } else {
    //     callback(null, restaurantList);
    //   }
    // });
  },

 async searchRestaurantBytext(searchText, callback) {
    Logger.debug('RestaurantServices.searchRestaurantByText');
    try {
      const restaurants = await Restaurant.searchRestaurantByText(searchText)
      return restaurants;
    } catch (error) {
      debug.error(`Error in RestaurantServices.searchRestaurantByText ${error}`)
      return error
    }
    // Restaurant.searchRestaurantByText(searchText, (error, restaurantsFound) => {
    //   if (error) {
    //     callback(error);
    //   } else {
    //     callback(null, restaurantsFound);
    //   }
    // });
  },

async  updateRestaurant(restaurantId, restaurantData, callback) {
    Logger.debug('RestaurantServices.updateRestaurant');
    try {
      const restaurant = await Restaurant.updateRestaurant(restaurantId,restaurantData)
      // Logger.verbose(`${restaurant}`)
      return restaurant
    } catch (error) {
      Logger.error(`Error in RestaurantServices.updateRestaurant ${error}`)
      return callback(error);

    }
    // Restaurant.updateRestaurant(restaurantId, restaurantData, (error, updatedRestaurant) => {
    //   if (error) {
    //     Logger.error(`RestaurantServices.updateRestaurant at Restaurant.updateRestaurant${error}`);
    //     callback(error);
    //   } else {
    //     Logger.info('RestaurantServices.updateRestaurant executed successfully');
    //     callback(null, updatedRestaurant);
    //   }
    // });
  },

  async deleteRestaurant(restaurantId, userData, callback) {

    Logger.debug('RestaurantServices.deleteRestaurant');
    try {
     const restaurant=Restaurant.deleteRestaurant(restaurantId,userData)

     return restaurant
     
      
      
    
    
    
    } catch (error) {
      Logger.error(`Error in RestaurantServices.deleteRestaurant ${error}`)
      return error;
    }
    // Restaurant.deleteRestaurant(restaurantId, userData, (error, deletedRestaurant) => {
    //   if (error) {
    //     Logger.error(`RestaurantServices.deleteRestaurant at Restaurant.updateRestaurant${error}`);
    //     callback(error);
    //   } else {
    //     Logger.info('Restaurant deleted successfully');
    //     callback(null, deletedRestaurant);
    //   }
    // });
  },

  // setRestaurantRating(restaurantId,userData,callback){
  //     Restaurant.updateRestaurant(restaurantId,userData,(error,updatedRestaurant)=>{
  //         if (error) {
  //             Logger.error(`RestaurantServices.setRestaurantRating at Restaurant.updateRestaurant${error}`)
  //         } else {
  //             Logger.info('Restaurant rating added')
  //             callback(null,updatedRestaurant)
  //         }
  //     })
  // }
};
