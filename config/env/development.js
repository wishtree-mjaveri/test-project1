module.exports={
    baseURL: 'http://192.168.1.15:8080',

  APIURL: 'http://192.168.1.15:1337',

  datastores:{
    mongoServer: {
        // adapter: 'sails-mongo',
        // host: 'localhost',
        // port: 27017,
        // database: 'zonions',
        // user: '',
        // password: '',
        adapter: 'sails-mongo',
      url: 'mongodb://127.0.0.1:27017/zonions',
      },
  },
  logger: {
    channels: {
      file: {
        type: 'file',
        fileName: 'Restaurant_Logs/restaurant.log',
      },
      errorFile: {
        type: 'file',
        fileName: 'Restaurant_Logs/error.restaurant.log',
      },
      sentry: {
        type: 'sentry',
        dsn: 'https://42493d9c21cf444aa2a751745a0527a3@sentry.io/5171306',
      },
    },

    logLevelConfig: {
      verbose: {
        channels: ['console'],
      },
      debug: {
        channels: ['console'],
      },
      info: {
        channels: ['console'],
      },
      warn: {
        channels: ['console'],
      },
      error: {
        // channels: ['console', 'sentry'],
        channels: ['console'],
      },
    },
  },
   security: {
    cors: {
      allRoutes: true,
      // allowOrigins: '*',
      allowOrigins: ['http://localhost:8080', 'http://172.17.0.1:8080', 'http://localhost:9000', 'http://localhost:1337', 'http://192.168.1.20:1337', 'http://192.168.1.20:8080', 'http://192.168.1.15:1337', 'http://192.168.1.19:1337', 'http://192.168.1.15:8080', 'http://192.168.1.107:8080', 'http://192.168.1.107:1337'],
      allowCredentials: true,
      // allowAnyOriginWithCredentialsUnsafe: true,
      allowRequestMethods: 'GET, POST, OPTIONS, HEAD',
      allowRequestHeaders: 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization,Access-Control-Allow-Origin',
      allowResponseHeaders: 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization,Access-Control-Allow-Origin',
    },
  }, 
}