import ReactDOM from 'react-dom';
import React from 'react';
import {
  Form, Icon, Input, Button, Checkbox, message,
} from 'antd';
import '../styles/globalStyles.css';
import { Link } from 'react-router-dom';
import { ReCaptcha } from 'react-recaptcha-google';
import ValidationService from '../../../api/services/ValidationService';
import Validations from '../constants/Validations';
import URL from '../environment/environment';
import Messages from '../constants/Messages';

class Captcha extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenPresent: false,
      captchaActive: false,
    };
    this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
  }

  componentDidMount() {
    if (this.captchaDemo) {
      console.log('started, just a second...');
      this.captchaDemo.reset();
      this.captchaDemo.execute();
    }
  }

  onLoadRecaptcha() {
    if (this.captchaDemo) {
      this.captchaDemo.reset();
      this.captchaDemo.execute();
    }
  }

  verifyCallback(recaptchaToken) {
    // Here you will get the final recaptchaToken!!!
    console.log(recaptchaToken, '<= your recaptcha token');
  }

  render() {
    return (
      <div>
        {/* You can replace captchaDemo ref with whatever works for your component */}
        <ReCaptcha
          ref={(el) => { this.captchaDemo = el; }}
          size="normal"
          render="explicit"
          sitekey="6Lej6tUUAAAAAMCh6EVwyMzvVWXw_EgERxeoY5BY"
          onloadCallback={this.onLoadRecaptcha}
          verifyCallback={this.verifyCallback}
        />
      </div>
    );
  }

  /*  verifyCallback(recaptchaToken) {
    console.log('verify callback ',recaptchaToken);
    // Here you will get the final recaptchaToken!!!
    if (recaptchaToken) {
      this.setState({
        tokenPresent: true,
      });
      fetch(`${URL.APIURL}/verifyCaptcha`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: {},
      })
        .then((result) => result.json())
        .then(
          (result) => {
            console.log(result);
            if (result.status == 200) {
              this.props.history.push('/home');
            } else if (result.status === 300) {
              const responseMessage = (result.message).toString();
              console.log('responseMessage', responseMessage);
              message.error(responseMessage);
            } else if (result.status === 400) {
              this.props.history.push('/400.js');
              // bad request
            } else if (result.status === 429) {
                this.props.history.push('/verifyCaptcha');
                //Rate limit
            } else if (result.status === 404) {
              this.props.history.push('/notFound');
              // not found
            } else if (result.status === 422) {
              // server side validation error
              this.setState({
                serverSideValidationError: result.message.errMsgs,
              });
            } else if (result.status === 401) {
              // session expired
              window.location.replace('/signin');
            } else if (result.status === 403) {
              // request forbidden
              this.props.history.push('/requestForbidden');
            } else if (result.status === 500) {
              // server error
              this.props.history.push('/serverError');
            } else {
              message.error(this.props.intl.formatMessage({ id: 'errorMessage', defaultMessage: Messages.errorMessage }));
            }
          },
          (error) => {

          },
        );
    } else {
      message.error('Please verify yourself as human by clicking on check box');
    }
  }
 */
}

export default Captcha;
