
module.exports = {
    datastore: 'mongoServer',

    attributes: {

            image:{
                type:"string"
            }
            ,
            owner:{
                model:'Restaurant'
            }
   
  },
 


  async createRestaurantImages(values, callback) {
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
        const allRestaurants = await Restaurant.find()
        return callback(null,allRestaurants)
    } catch (error) {
        return callback(error)
    }
  },

  async updateRestaurant(restaurantId, restaurantData, callback) {
    const updatedRecord = await Restaurant.updateOne({ _id:restaurantId }).set(restaurantData);
    return callback(null, updatedRecord);
  },
  async deleteRestaurant(restaurantId, callback) {
    const deletedRecord = await Restaurant.destroy({ _id:restaurantId });
    return callback(null, deletedRecord);
  },

};

