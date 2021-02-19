import React from 'react';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,message
} from 'antd';
import URL from '../environment/environment'
import Messages from './../constants/Messages'
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

var that;

class Signup extends React.Component {
      constructor(props) {
        super(props); 
        this.state = {
            validationErrors:[]
         };
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.customValidation=this.customValidation.bind(this);
        that = this;
    }
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };
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
        console.log('handleSubmit.........................................?????');
        console.log(this.props.form.getFieldsValue());
        let values = this.props.form.getFieldsValue();
        console.log(values);
        values.email=values.username;
        fetch(URL.APIURL + "/registration", {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(values),
        })
          .then((result) => {return result.json()})
          .then(
            (result) => {
                console.log(result)
                if (result.status == 200) {
                this.props.form.resetFields();
                this.props.history.push('/signin');
                message.success(Messages.signUpSuccess)               

              }
              else if (result.status === 300) {
                let responseMessage = (result.message).toString();
                console.log('responseMessage', responseMessage);
                message.error(result.message);
              }
              else if (result.status === 429) {
                this.props.history.push('/verifyCaptcha');
                //Rate limit
              }
              else if (result.status === 400) {
                this.props.history.push('/400.js');
                //bad request
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

            }
          )
    };

    // handleConfirmBlur = e => {
    //     const { value } = e.target;
    //     this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    // };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    // handleWebsiteChange = value => {
    //     let autoCompleteResult;
    //     if (!value) {
    //         autoCompleteResult = [];
    //     } else {
    //         autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    //     }
    //     this.setState({ autoCompleteResult });
    // };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        

        return (
            <Form onSubmit={this.handleSubmit} className="register-form">
              <Form.Item label="Name">
                    {getFieldDecorator('name', {
                        rules: [  {
                                required: true,
                                message: 'Please input your password!',
                            },{
                             validator: this.customValidation,
                           }
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Username">
                    {getFieldDecorator('username', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your username!',
                            },{
                             validator: this.customValidation,
                           }
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Password" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                validator: this.validateToNextPassword,
                            },
                        ],
                    })(<Input.Password />)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
          </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(Signup);

export default WrappedRegistrationForm;          