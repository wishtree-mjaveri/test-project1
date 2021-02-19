import ReactDOM from 'react-dom';
import React from 'react';
import { Form, Icon, Input, Button, Checkbox,message} from 'antd';
import '../styles/globalStyles.css';
import { Link } from "react-router-dom";
import ValidationService from '../../../api/services/ValidationService';
import Validations from '../constants/Validations';
import URL from '../environment/environment';
import Messages from '../constants/Messages';
import { ReCaptcha } from 'react-recaptcha-google'
import FacebookLogin from 'react-facebook-login';

var that;
class Signin extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            validationErrors:[],
            passwordCount: 0,
            tokenPresent: false,
            captchaActive: false
         };
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.customValidation=this.customValidation.bind(this);
    //    this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        that = this;
    }
    componentDidMount() {
        if (this.captchaDemo) {
            console.log("started, just a second...")
            this.captchaDemo.reset();
        }
    }
    // onLoadRecaptcha() {
    //     console.log("onLoadRecaptcha..................", this.captchaDemo)

    //     if (this.captchaDemo) {
    //         this.captchaDemo.reset();
    //     }
    // }
    verifyCallback(recaptchaToken) {
        console.log('verifyCallback in sign in',recaptchaToken)
        // Here you will get the final recaptchaToken!!!  
        if (recaptchaToken) {
            this.setState({
                tokenPresent: true
            })
        }
    }
     customValidation (rule, value, callback) {
         const args = [{
            name: rule.field ,
            value: value,
            validations: Validations.loginFormValidations[rule.field] ,
        }];
        ValidationService.validate(args, (validationErr, validationErrMsgs) => {
        if (validationErr) {
        console.log('in validation er');
      } else if (validationErrMsgs.length > 0) {
        console.log('else if', validationErrMsgs);
          this.setState({
              validationErrors:validationErrMsgs
          })
        callback(validationErrMsgs[0].validations[0].message);
      }
      else{
          this.setState({
              validationErrors:[]
          })
      }
    });
    }
    handleSubmit = e => {
        e.preventDefault();
        console.log('handleSubmit.........................................??signin???');
        console.log(this.props.form.getFieldsValue());
        let values = this.props.form.getFieldsValue();
    
         if(this.state.validationErrors.length > 0){
             console.log('in if',this.state.validationErrors);

         }
         else{
             //this.props.history.push('/home');
             console.log('in else');
         fetch(URL.APIURL + "/login", {
          method: 'POST',
        //  mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          credentials: 'include',
          body: JSON.stringify(values),
        })
          .then((result) => {console.log(result); return result.json()})
          .then(
            (result) => {
              console.log(result)
              if (result.status == 200) {
              
               // message.success(Messages.loginSuccess)     
               if (this.state.captchaActive === true) {
                        if (this.state.tokenPresent === true) {
                            that.props.history.push('/home');
                        } else {
                            message.error('Please verify yourself as human by clicking on check box')
                        }
                    } else {
                           this.props.history.push('/home');
                    }          

              }
              else if (result.status === 300) {
                let responseMessage = (result.message).toString();
                console.log('responseMessage', responseMessage);
                message.error(responseMessage);
                if(responseMessage == 'Incorrect Password' || responseMessage == 'Incorrect Username'){
                  if (this.state.passwordCount >= 2) {
                        if (this.state.tokenPresent === true) {
                            message.error('Incorrect username or password');
                        } else {
                            this.setState({
                                captchaActive: true,
                                username: '',
                                password: '',

                            })
                            message.error('Please verify your self as human and enter the username and password again')
                        }
                    } else {
                        //message.error('Incorrect username or password');
                        let passwordCount =this.state.passwordCount
                        console.log('passwordCount', this.state.passwordCount)
                        passwordCount = passwordCount + 1;
                        console.log('passwordCount',passwordCount)
                        this.setState({
                            passwordCount: passwordCount
                        })
                    }
                }
              }
              else if (result.status === 400) {
                this.props.history.push('/400.js');
                //bad request
              }
              else if (result.status === 429) {
                this.props.history.push('/verifyCaptcha');
                //Rate limit
              }
              else if (result.status === 404) {
                this.props.history.push('/notFound');
                //not found
              }
              else if (result.status === 422) {
                // server side validation error
                this.setState({
                  serverSideValidationError: result.message.errMsgs
                })
              } else if (result.status === 401) {
                // session expired
                window.location.replace('/signin');
              }
              else if (result.status === 403) {
                // request forbidden
                this.props.history.push('/requestForbidden');
              }
              else if (result.status === 500) {
                // server error
                this.props.history.push('/serverError');
              }
              else {
                message.error(this.props.intl.formatMessage({ id: 'errorMessage', defaultMessage: Messages.errorMessage }));
              }
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                console.log('error : '+error);
            }
          )
         }
    };
    
    register() {
        console.log('gefrhjdgfhjdsgfdsfgdhjfghj');
        this.props.history.push('/signin');
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        /* const responseFacebook = (response) => {
          console.log('response from facebook');
          console.log(response);
        } */
        return (
         <div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{
                             validator: this.customValidation,
                           }
                        ],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                           rules: [{
                             validator: this.customValidation,
                           }
                        ],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                 {this.state.captchaActive === true ?
                        <span>
                            <ReCaptcha
                                ref={(el) => { this.captchaDemo = el; }}
                                size="normal"
                                render="explicit"
                                sitekey="6Lej6tUUAAAAAMCh6EVwyMzvVWXw_EgERxeoY5BY"
                                //onloadCallback={this.onLoadRecaptcha}
                                verifyCallback={this.verifyCallback}
                            />
                            <br></br>

                        </span>
                        : null}
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>Remember me</Checkbox>)}
                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <Link to={'/signup'}>register now! </Link>
                </Form.Item>
                {/* <div style={{ padding: 10 }}>
                    <FacebookLogin
                        appId="1218514478336787" //APP ID NOT CREATED YET
                        fields="name,email,friends"
                        scope="public_profile,user_friends"
                        callback={responseFacebook}
                        cssClass="my-facebook-button-class"
                    />
                </div> */}
            </Form>
         </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Signin);
// const mapStateToProps = (state) => {
//     console.log(state)
//     const users = state;
//     return users;
// }
// function mapDispatchToProps(dispatch) {
// console.log('mapDispatchToProps in Form.js', dispatch)
// return {
// addUser: user => dispatch(addUser(user))
// };
// }
// export default connect(null,mapDispatchToProps, { addUser })(WrappedNormalLoginForm);
 export default (WrappedNormalLoginForm);