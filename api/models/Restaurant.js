

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
    }
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

  async getAllRestaurants(page,pagination,callback) {
    try {
        const allRestaurants = await Restaurant.find().skip((page-1)*pagination).limit(pagination)
        return callback(null,allRestaurants)
    } catch (error) {
        return callback(error)
    }
  },
  async getRestaurants(callback) {
    try {
        const allRestaurants = await Restaurant.find({isActive:true})
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

};

