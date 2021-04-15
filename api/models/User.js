/* eslint-disable object-shorthand */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
// const bcrypt = require('bcrypt-nodejs');
const Logger = require('../services/Logger');
const MailService = require('../services/MailService');

module.exports = {
  datastore: 'mongoServer',
  attributes: {
    email: {
      type: 'string',
      isEmail: true,
      required: true,
      unique: true,
    },
    username: {
      type: 'string',
      required: true,

    },
    password: {
      type: 'string',
      required: true,
    },
    role: {
      type: 'string',
    },
    isVerified: {
      type: 'boolean',
      defaultsTo: false,
    },
    uniqueString: {
      type: 'string',
      defaultsTo:'1234'
    },

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
  // randomString() {
  //   const len = 4;
  //   let randstr = '';
  //   for (let i = 0; i < len.length; i++) {
  //     const ch = Math.floor((Math.random * 10) + 1);
  //     randstr += ch;
  //   }
  //   return randstr;
  // },
  beforeCreate(valuesToSet, proceed) {
    // Generate unique id using npm module uniqid
    valuesToSet.uniqueString = sails.config.globals.uniqid.process();
    return proceed();
  },

  async findByEmail(email, callback) {
    try {
      Logger.verbose(`in find by email method ${email}`);
      const userExist = await User.find({ email });
      if (userExist.length > 0) {
        Logger.verbose(userExist);
        return callback(null, userExist);
      }
      return callback(null);
    } catch (error) {
      return callback(error);
    }
  },

  async IsVerified(user,callback){
try {
  Logger.verbose('in IsVerified')
  const notVerified=User.find({email:user.email,isVerified:false})
  if(notVerified)
  return callback(null,notVerified)
  
} catch (error) {
  return callback(error)
}
  },

  async createUser(values, callback) {
    try {
      // values.uniqueString = this.randomString();
      const createdRecord = await User.create(values).fetch();
      MailService.sendMail(values, values.uniqueString);
      return callback(null, createdRecord);
    } catch (error) {
      return callback(error);
    }
  },

  async verify(id, callback) {
    try {
      const verifiedUser = await User.updateOne( { uniqueString:id,isVerified:false }).set({ isVerified: true });
      if (!verifiedUser) {
        return callback(null);
      }
      Logger.verbose(`verified user - ${verifiedUser} `);
      return callback(null, verifiedUser);   
    } catch (error) {
      return callback(error);
    }
  },
  async findVerifiedById(id, callback) {
    try {
      const data = await User.findOne({ id, isVerified: true });
      return callback(null, data);
    } catch (error) {
      return callback(error);
    }
  },

};
