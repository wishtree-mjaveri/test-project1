
const { loggers } = require("winston")
const Restaurant = require("../models/Restaurant")
const Logger = require("./Logger")

module.exports={
   async registeration(registerationData,callback){
       Logger.debug('in service')
        // logger.verbose('RegisterationService.registeration')
        Restaurant.createRestaurant(registerationData,(error,restaurantData)=>{
            if (error) {
                // Logger.error(`RestaurantService.registeration at create ${createErr}`),
                console.log('in service error ')
                callback(error)
            } else {
                // logger.info('Restaurant details saved successfully')
                callback(null,restaurantData)
            }
        })

    },

    getRestaurant(id,callback){
       Logger.debug('RestaurantServices.getRestaurant')
        Restaurant.getRestaurant(id,(error,restaurantFound)=>{
            if (error) {
                callback(error)
            } else {
                callback(null,restaurantFound)
            }
        })
    },

    getAllRestaurants(page,pagination,callback){
        Logger.debug('RestaurantServices.getALlRestaurant')
        Restaurant.getAllRestaurants(page,pagination,(error,restaurantList)=>{
            if (error) {
                callback(error)
            } else {
                callback(null,restaurantList)
            }
        })
    },
    getRestaurants(callback){
        Logger.debug('RestaurantServices.getALlRestaurant')
        Restaurant.getRestaurants((error,restaurantList)=>{
            if (error) {
                callback(error)
            } else {
                callback(null,restaurantList)
            }
        })
    },

    searchRestaurantBytext(searchText,callback){
        Logger.debug('RestaurantServices.searchRestaurantByText')
        Restaurant.searchRestaurantByText(searchText,(error,restaurantsFound)=>{
            if (error) {
                callback(error)
            } else {
                callback(null,restaurantsFound)
            }
        })

    },

    updateRestaurant(restaurantId,restaurantData,callback){
        Logger.debug('RestaurantServices.updateRestaurant')
        Restaurant.updateRestaurant(restaurantId,restaurantData,(error,updatedRestaurant)=>{
            if (error) {
                Logger.error(`RestaurantServices.updateRestaurant at Restaurant.updateRestaurant${error}`)
                callback(error)
            } else {
                Logger.info('RestaurantServices.updateRestaurant executed successfully')
                callback(null,updatedRestaurant)
            }
        })
    },

    deleteRestaurant(restaurantId,userData,callback){
        Logger.debug('RestaurantServices.deleteRestaurant')
        Restaurant.deleteRestaurant(restaurantId,userData,(error,deletedRestaurant)=>{
            if (error) {
                Logger.error(`RestaurantServices.deleteRestaurant at Restaurant.updateRestaurant${error}`)
                callback(error)
            } else {
                Logger.info('Restaurant deleted successfully')
                callback(null,deletedRestaurant)
            }
        })

    }
}