const Logger = require('../services/Logger')


module.exports = {
    datastore: 'mongoServer',

    attributes: {


    restaurantName: {
      type: "string",
      required:true
    },
    restaurantDescription: {
      type: "string",
    },
    restaurantAddress: {
      type: "string",
    },
    restaurantOpeningTime: {
      type: "string",
    },
    restaurantClosingTime: {
      type: "string",
    },
    uid:{
      type:"string"
    },
    image:{
      type:"string"
    },
    isActive:{
      type:"boolean",
      defaultsTo:true
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


  async createRestaurant(values, callback) {
    try {
      const createdRestaurant = await Restaurant.create(values).fetch();
      console.log("in model", createdRestaurant);
      return callback(null, createdRestaurant);
    } catch (error) {
        console.log(error)
      return callback(error);
    }
  },
  async getRestaurant(id,callback){
      try {
          const restaurantFound = await Restaurant.findOne({_id:id})
          if (restaurantFound==undefined) {
              return callback(error)
          } else {
            sails.log.debug("restaurant founded,",restaurantFound)
            return callback(null,restaurantFound)
          }
        
      } catch (error) {
          return callback(error)
      }
  
  },

  async getAllRestaurants(page,pagination,sortOrder,callback) {
    try {
        const allRestaurants = await Restaurant.find().where({isActive:true}).skip((page-1)*pagination).limit(pagination).sort(`restaurantName ${sortOrder}`)
        return callback(null,allRestaurants)
    } catch (error) {
        return callback(error)
    }
  },
  async getRestaurants(callback) {
    try {
        const allRestaurants = await Restaurant.find({isActive:true}).sort('restaurantName ASC')
        return callback(null,allRestaurants)
    } catch (error) {
        return callback(error)
    }
  },

  async updateRestaurant(restaurantId, restaurantData, callback) {
    const updatedRecord = await Restaurant.updateOne().where({ _id:restaurantId }).set(restaurantData);
    return callback(null, updatedRecord);
  },
  async deleteRestaurant(restaurantId, restaurantData,callback) {
    const deletedRecord = await Restaurant.updateOne().where({uid:restaurantId,isActive:true}).set(restaurantData);
    return callback(null, deletedRecord);
  },

  async searchRestaurantByText(searchText,callback){
    
    Logger.verbose('Restaurant Model')
    try {
     
        const restaurantsFound = await Restaurant.find({
          isActive:true,
          or:[{
          restaurantDescription:{contains:searchText}

          },{restaurantAddress:{contains:searchText}}]
      }) 
      return callback(null,restaurantsFound)  
      
    } catch (error) {
      return callback(error)
    }
     
  },
  // async setRestaurantRating(restaurantId, restaurantData, callback) {

  //   const updatedRecord = await Restaurant.updateOne().where({ _id:restaurantId }).set({ratings:restaurantData});
  //   return callback(null, updatedRecord);
  // },

};

