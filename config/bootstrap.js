/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function setup(cb) {
  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```
  function logAndExitSails(err, message) {
    console.log(err.message);
    sails.log.error(err.message);
    console.log(message);
    sails.log.error(message);
    return setTimeout(() => {
      process.exit();
    }, 3000);
  }
  try {
    Logger.setup();
  } catch (err) {
    return logAndExitSails(err, 'Logger service failed. Sails process will exit now. You can configure the logger and try again.');
  }
  const registrationData={
    username:"superadmin",
    role:"Admin",
    email:"superadmin123@demo.com",
    password:"superadmin"

  }
  UserServices.registration(registrationData, (registrationErr, registeredUSer) => {
    if (registrationErr) {
      if (registrationErr === 'Already Present') {
        sails.log.info('Super Admin exists.');
        cb();
      } else {
        logAndExitSails(registrationErr, 'Error while creating Super Admin. Please contact your Administrator.');
      }
    } else if (!registeredUSer) {
      logAndExitSails(registrationErr, 'Error while creating Super Admin. Please contact your Administrator.');
    } else {
      sails.log.info('Super Admin created successfully.');
      cb();
    }
  });
};
