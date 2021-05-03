/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

const { policies } = require('./policies');

module.exports.routes = {

  /** *************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ************************************************************************** */

  '/': { view: 'pages/homepage' },

  /** *************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ************************************************************************** */
  'POST /api/registration': {
    controller: 'RestaurantController',
    action: 'registration',
  },

  'GET /api/restaurant': {
    controller: 'RestaurantController',
    action: 'getRestaurant',
  },

  'GET /api/restaurants': {
    controller: 'RestaurantController',
    action: 'getAllRestaurant',
  },
  'GET /api/card/restaurants': {
    controller: 'RestaurantController',
    action: 'getRestaurants',
  },

  'GET /api/description/restaurants': {
    controller: 'RestaurantController',
    action: 'searchRestaurantsByText',
  },

  'PUT /api/restaurant': {
    controller: 'RestaurantController',
    action: 'updateRestaurant',
  },

  'GET /api/admin/restaurants': [
    { policy: 'isAdmin' },

    // {controller:'RestaurantController'},
    'RestaurantController.getAllRestaurant',
  ],

  'DELETE /api/restaurant': {
    controller: 'RestaurantController',
    action: 'deleteRestaurant',
  },

  'POST /user/login': {
    controller: 'AuthController',
    action: 'login',
  },
  'POST /user/logout': {
    controller: 'AuthController',
    action: 'logout',
  },
  'POST /user/registration': {
    controller: 'UserController',
    action: 'registration',
  },

  // 'GET /user/verify/email/:email': {
  //   controller:'UserController',
  //   action: 'findByEmail'
  // },
  'GET /user/email':{
    controller: 'UserController',
    action: 'findByEmail'
  },

  'GET /verify/:uniqueString': {
    controller: 'UserController',
    action: 'verify',
  },

  'PUT /restaurant/rating': {
    controller: 'RestaurantController',
    action: 'setRestaurantRating',
  },

  'GET /api/v1/auth/google':                {controller: 'AuthController', action: 'googleAuth'},
'GET /api/v1/auth/google/callback':       {controller: 'AuthController', action: 'googleCallback'},

'GET /api/v1/auth/facebook': {controller: 'AuthController', action: 'facebookAuth'},
'GET /api/v1/auth/facebook/callback': {controller: 'AuthController', action: 'facebookCallback'},
};
