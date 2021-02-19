import Messages from './Messages';

module.exports = {
  loginFormValidations:
    {
      username: [{
        validation: 'notEmpty',
        message: Messages.usernameEmpty,
      },
      {
        validation: 'minLength',
        minLength: 2,
        message: Messages.minLength,
      },
      {
        validation: 'email',
        message: Messages.email,
      }],
      endDate: [{
        validation: 'notEmpty',
        // compareTo:''
        message: Messages.passwordEmpty,
      }],
    },

};
