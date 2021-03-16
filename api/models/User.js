/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const bcrypt = require('bcrypt-nodejs');
const Logger = require("../services/Logger")
module.exports = {
  datastore: 'mongoServer',
  attributes: {
    email: {
      type: 'string',
      isEmail: true,
      required: true,
      unique: true
    },
    username: {
      type: 'string',
      required: true,
     
    },
    password: {
      type: 'string',
      required: true
    }
  

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },
//   customToJSON: function() {
//     return _.omit(this, ['password'])
//  }, 
//  beforeCreate: function(user, cb){
//   bcrypt.genSalt(10, function(err, salt){
//     bcrypt.hash(user.password, salt, null, function(err, hash){
//       if(err) return cb(err);
//       user.password = hash;
//       return cb();
//     });
//   });
// },
async findByEmail(email,callback){
try {
  Logger.verbose(`in find by email method ${email}`)
  const userExist = await User.find({email:email})
 if (userExist.length>0) {
   Logger.verbose(userExist)
  return callback(null,userExist)
   
 } else {
  return callback(null)
   
 }
} catch (error) {
  return callback(error)
}
},
async createUser(values, callback) {
  try {
    const createdRecord = await User.create(values).fetch();
    return callback(null, createdRecord);
  } catch (error) {
    return callback(error);
  }
},


};

