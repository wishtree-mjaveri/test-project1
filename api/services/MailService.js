/* eslint-disable no-console */
const nodemailer = require('nodemailer');

module.exports = {

  sendMail(values, uniqueString) {
    const Transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'maddywalaa@gmail.com',
        pass: 'maddywala123',
      },
    });
    // let mailOptions;
    // const sender = 'madhav';
    const mailOptions = {
      from: 'maddywalaa@gmail.com',
      to: values.email,
      subject: 'Email verification',
      html: `Press <a href=http://localhost:1337/verify/${values.uniqueString}> here </a> to verify email.Thanks `,
      // html:`otp ${uniqueString}`
    };
    Transport.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log(err);
        return false;
      } else {
        console.log('otp sent on email=', data);
        return true;
      }
    });
  },

};
