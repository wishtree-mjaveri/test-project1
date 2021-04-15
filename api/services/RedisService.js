// const Logger = require('../services/Logger');
// const User = require( '../models/User');
// const redis =  require( 'redis');
// const port = sails.config.redis.port;
// const redisHost = sails.config.redis.host;
// const password = sails.config.redis.password;
// // let client;

// module.exports={ 
//   setup(callback) {
//     Logger.info('in Redis Setup method')
//     client = redis.createClient({
//       port:'6379',
//       host:'127.0.0.1',
//       // password:password,
//       enable_offline_queue: false,
//       db: 1,
//       retry_strategy(options) {
//         if (options.error && options.error.code === 'ECONNREFUSED') {
//           // End reconnecting on a specific error and flush all commands with a individual error
//           return new Error('The server refused the connection');
//         }
//         if (options.total_retry_time > 1000 * 60 * 60) {
//           // End reconnecting after a specific timeout and flush all commands with a individual error
//           return new Error('Retry time exhausted');
//         }
//         if (options.times_connected > 5) {
//           // End reconnecting with built in error
//           return undefined;
//         }
//         // reconnect after
//         return Math.max(options.attempt * 100, 10000);
//       },
//     });
//     // console.log(client)

//     client.on('error', (err) => {
//       Logger.error(err);
//       callback(err);
//     });

//     client.on('ready', () => {
//         Logger.info(`Redis setup ready`)

//       callback(null);
//     });

//     client.on('reconnecting', () => {
//       Logger.info('Reconnecting Redis client..');
//     });
//   },
    
//     setUser(userId,user){

//         user.name=`${user.username}`;
//         client.set([`zonion:user:${userId}`,JSON.stringify(user)],(err)=>{
//             if (err) {
//                 Logger.error(`RedisService.setUser at client.set ${err}`)
//             } else {
//                 const todayEnd = (new Date().setHours(23,59,59,999))/100;
//                 client.expireat([`zonion:user:${userId}`, parseInt(todayEnd.toString(), 10)], (err) => {
//                     if (err) {
//                       Logger.error(`RedisService.setUser at client.pexpireat ${err}`);
//                     }
//                   });
//             }
//         })
//     },
//     getUser(userId, callback) {
//         Logger.debug('RedisService.getUser');
//         // console.log(client)
//         client.get([`zonion:user:${userId}`], (err, user) => {
//           if (err) {
//             Logger.error(`RedisService.getUser at client.get ${err}`);
//             callback(err);
//           } else if (user != null && user !== '') {
//             const parseUserObj = JSON.parse(user);
//             callback(null, parseUserObj);
//           } else {
//             User.findVerifiedById(userId, (findErr, usermodel) => {
//               if (findErr) {
//                 Logger.error(`RedisService.getUser at User.findActiveById ${findErr}`);
//                 callback(err, null);
//               } else if (!usermodel) {
//                 Logger.warn('RedisService.getUser at User.findActiveById usermodel undefined');
//                 callback('User not found', null);
//               } else {
//                 RedisService.setUser(userId, usermodel);
//                 callback(null, usermodel);
//               }
//             });
//           }
//         });
//       },
    
   
// }


const Logger = require('../services/Logger');
const User = require( '../models/User');
const redis =  require( 'redis');
const port = sails.config.redis.port;
const host = sails.config.redis.host;
const password = sails.config.redis.password;
// let client1;
let client1 = redis.createClient({
  port,
  host,
  db:1
});
module.exports={ 

    
   setUser(userId,user){

        user.name=`${user.username}`;
        client1.set(`zonion:user:${userId}`, JSON.stringify(user.name), (setErr) => {
          if (setErr) {
            Logger.error(`RedisService.setUser at client1.set ${setErr}`);
          } else {
                const todayEnd = (new Date().setHours(23,59,59,999))/100;
               
                    client1.expireat(`zonion:user:${userId}`, parseInt(String(todayEnd / 1000), 10), (err) => {
                      if (err) {
                        Logger.error(`RedisService.setUser at client1.expireat ${err}`);
                      }
                  });
            }
        })
    },

   
  
      getUser(userId, callback) {
        Logger.debug('RedisService.getUser');
        // console.log(client1)
       
          client1.get([`zonion:user:${userId}`],  (err, user) => {
            if (err) {
              Logger.error(`RedisService.getUser at client1.get ${err}`);
             return callback(err);
            }
          else if (user != null && user !== '') {
            const parseUserObj = JSON.parse(user);
            Logger.info(`user already exist ${parseUserObj}`)
            Logger.info(`zonion:user:${userid}`)
           
            return callback(null, parseUserObj);
          } else {
            User.findVerifiedById(userId, (findErr, usermodel) => {
              if (findErr) {
                Logger.error(`RedisService.getUser at User.findActiveById ${findErr}`);
                return callback(err, null);
              } else if (!usermodel) {
                Logger.warn('RedisService.getUser at User.findActiveById usermodel undefined');
               return callback('User not found', null);
              } else {
                RedisService.setUser(userId, usermodel);
               return callback(null, usermodel);
              }
            });
          }
        });
      }, db: 0,

      setup(callback) {
        Logger.info('in Redis Setup method')
        client1 = redis.createClient({
          port,
          host,
          // password:password,
          enable_offline_queue: false,
          db: 1,
          retry_strategy(options) {
            if (options.error && options.error.code === 'ECONNREFUSED') {
              // End reconnecting on a specific error and flush all commands with a individual error
              return new Error('The server refused the connection');
            }
            if (options.total_retry_time > 1000 * 60 * 60) {
              // End reconnecting after a specific timeout and flush all commands with a individual error
              return new Error('Retry time exhausted');
            }
            if (options.times_connected > 5) {
              // End reconnecting with built in error
              return undefined;
            }
            // reconnect after
            return Math.max(options.attempt * 100, 10000);
          },
        });
        // console.log(client)
    
        client1.on('error', (err) => {
          Logger.error(err);
          callback(err);
        });
    
        client1.on('ready', () => {
            Logger.info(`Redis setup ready`)
    
          callback(null);
        });
    
        client1.on('reconnecting', () => {
          Logger.info('Reconnecting Redis client..');
        });
      },
    
   
}