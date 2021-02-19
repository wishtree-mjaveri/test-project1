/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';
import ValidationService from '../../api/services/ValidationService';
import '../../node_modules/antd/dist/antd.css';
import { loadReCaptcha } from 'react-recaptcha-google';
// import Messages from './constants/Messages';
import HomePage from './components/HomePage';
import CaptchaPage from './components/CaptchaPage';
import Example from './components/Example';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  // UNSAFE_componentWillMount() {
  //   // console.log('Messages.LoginForm.login ======= check here');
  //   // console.log(Messages.LoginForm.login);
  //   const args = [{
  //     name: 'Language',
  //     value: '',
  //     validations: [{
  //       validation: 'notEmpty',
  //       message: 'languageEmpty',
  //     }],
  //   }];
  //   ValidationService.validate(args, (validationErr, validationErrMsgs) => {
  //     const test = validationErrMsgs;
  //     if (validationErr) {
  //       //
  //     } else if (validationErrMsgs.length > 0) {
  //       console.log('else if', validationErrMsgs);
  //     }
  //   });
  // }


  componentWillMount() {
    global.io.socket.post('/api/subscribeNotification', { id: '5e329b524ca3e41d2ef5a31a' }, (resData, jwres) => {
      console.log('======= /api/subscribeNotification =======');
      console.log(resData);
    });
    global.io.socket.on('notification', (data) => {
      console.log('======= notification ==========');
      global.notificationData = data.notification[0];
      console.log(data);
    });
  }

  componentDidMount() {
    loadReCaptcha();
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/" exact component={Signin} />
            <Route path="/signin" exact component={Signin} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/home" exact component={HomePage} />
            <Route path="/verifyCaptcha" exact component={Example} />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
