/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
const { loggers } = require('winston');
const Logger = require('../services/Logger');

module.exports = {
  datastore: 'mongoServer',

  attributes: {

    restaurantName: {
      type: 'string',
      required: true,
    },
    restaurantDescription: {
      type: 'string',
    },
    restaurantAddress: {
      type: 'string',
    },
    restaurantOpeningTime: {
      type: 'string',
    },
    restaurantClosingTime: {
      type: 'string',
    },
    uid: {
      type: 'string',
    },
    image: {
      type: 'string',
    },
    isActive: {
      type: 'boolean',
      defaultsTo: true,
    },
    // ratings:{
    //   type:'json',
    //   columnType:'array'
    // }
  },
  beforeCreate(valuesToSet, proceed) {
    // Generate unique id using npm module uniqid
    valuesToSet.uid = sails.config.globals.uniqid.process();
    return proceed();
  },


  async createRestaurant(values) {
    try {
      const createdRestaurant = await Restaurant.create(values).fetch();
      Logger.info('Created restaurant');
      return  createdRestaurant;
    } catch (error) {
     Logger.error(`Error in Restaurant.createRestaurant ${error}`)
      return error;
    }
  },
  async getRestaurant(id) {
    try { 
      const restaurantFound = await Restaurant.find().where({ uid:id }).limit(1).select(['restaurantName', 'restaurantDescription', 'restaurantOpeningTime', 'restaurantClosingTime', 'uid', 'image', 'restaurantAddress'])
      // if (restaurantFound == undefined||restaurantFound==null) {
      //   return error;
      // }
    Logger.info('restaurant founded,');
    Logger.info(restaurantFound)
      return  restaurantFound;
    } catch (error) {
     Logger.error(`Error in Restaurant.getRestaurant ${error}`)
      return error;
    }
  },

  async getAllRestaurants(page, pagination, sortOrder) {
    try {
      const allRestaurants = await Restaurant.find().where({ isActive: true }).skip((page - 1) * pagination).limit(pagination)
        .sort(`restaurantName ${sortOrder}`).select(['restaurantName', 'restaurantDescription', 'restaurantOpeningTime', 'restaurantClosingTime', 'uid', 'image', 'restaurantAddress']);
        Logger.info('Restaurants fetched successfully')
      return  allRestaurants;
    } catch (error) {
      Logger.error(`Error Restaurant.getAllRestaurants in ${error}`)
      return error;description: result.restaurantDescription
    }
  },
  async getRestaurants() {
    try {
      const allRestaurants = await Restaurant.find({
        select: ['restaurantName', 'restaurantDescription', 'restaurantOpeningTime', 'restaurantClosingTime', 'uid', 'image', 'restaurantAddress'],
        where: { isActive: true },

      }).sort('restaurantName ASC');
      Logger.info('fetched all restaurants');
      return  allRestaurants;
    } catch (error) {
      Logger.error(`Error in Restaurant.getRestaurants ${error}`)
      return error;
    }
  },

  async updateRestaurant(restaurantId, restaurantData, callback) {
   try {
    const updatedRecord = await Restaurant.update().where({id:restaurantId}).set(restaurantData);
    Logger.verbose(`${updatedRecord}`)
    Logger.info('Restaurant Update Successful')
    return  updatedRecord;
   } catch (error) {
    Logger.error(`Error in Restaurant.updateRestaurant ${error}`)
     
    return error;
   }
  
  },
  async deleteRestaurant(restaurantId, restaurantData, callback) {
    Logger.verbose('Restaurant.deleteRestaurant')
   try {
    const restaurant = await Restaurant.findOne({uid:restaurantId,isActive:true})
    Logger.verbose(restaurant)
    if (restaurant!=undefined) {
    const deletedRecord = await Restaurant.update().where({ uid: restaurantId, isActive: true }).set(restaurantData);
    return restaurant
      
    } 
    // const deletedRecord = await Restaurant.update().where({ uid: restaurantId, isActive: true }).set(restaurantData);
    
    // Logger.info('Restaurant Delete Successful')
    // Logger.info(`${deletedRecord}`)
    // if(deletedRecord!=null&&deletedRecord!==undefined){
    //   return  deletedRecord;

    // }
    
    // return deletedRecord
   } catch (error) {
     Logger.error(`Error in Restaurant.deleteRestaurant ${error}`)
     return error
   }
   
  },

  async searchRestaurantByText(searchText, callback) {
    Logger.verbose('Restaurant Model');
    try {
      const restaurantsFound = await Restaurant.find({
        isActive: true,
        or: [{
          restaurantDescription: { contains: searchText },

        }, { restaurantAddress: { contains: searchText } }],
      });
       return restaurantsFound;
    } catch (error) {
      return error;
    }
  },
  // async setRestaurantRating(restaurantId, restaurantData, callback) {

  //   const updatedRecord = await Restaurant.updateOne().where({ _id:restaurantId }).set({ratings:restaurantData});
  //   return callback(null, updatedRecord);
  // },

};
