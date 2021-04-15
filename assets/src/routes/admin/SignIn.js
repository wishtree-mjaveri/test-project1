import React, { useState } from 'react';
import {
  Button, Checkbox, Form, Input, Modal, message,
} from 'antd';
import { Link, useHistory } from 'react-router-dom';
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined';
import LockOutlined from '@ant-design/icons/lib/icons/LockOutlined';
import Axios from 'axios';
import { injectIntl, FormattedMessage } from 'react-intl';
import IntlMessages from '../../util/IntlMessages';
import localforage from 'localforage'
const FormItem = Form.Item;

const SignIn = (props) => {
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = (values) => {
    console.log('finish', values);
  };

  const successfulLogin = () => {
    message.success('Login successful');
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState('');
  const [errorState, seterrorState] = useState(false);
  const [userExist, setUserExist] = useState(false)
  const [role, setRole] = useState('')

  const header = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  };
  localforage.getItem('user-key').then(res=>{console.log(res)
    if (res.email.length>0) {
      setUserExist(true),setRole(res.role)
    } 
  }).catch(err=>console.log(err))
  
  const showModal = () => {
    
  
  if (userExist&&role=='Admin') {
    history.push('/admin-home')
    
  } 
  if(userExist==true&&role=="") {
    history.push('/userhomepage')
  }
    setIsModalVisible(true);

  
     
   
  };

  const closeModal = ()=>{
    setIsModalVisible(false)
  }

  const handleLogin = () => {
    
    if (email.length == 0 || password.length == 0) {
      setIsModalVisible(true);
    } else {
      Axios.post('http://localhost:1337/user/login', { email, password }, { headers:header.headers, withCredentials: true })

        .then((res) => {
          console.log(res);
          if (res.data.user.isVerified == true && res.data.user.role !== 'Admin') {
            history.push('/userhomepage');
            message.success("Login successful")
            localforage.setItem('user-key',res.data.user,(err,val)=>{
              if (err) {
                console.log(err)
              }
              console.log(val)
            })
          }
          if (res.data.user.isVerified == false || res.data.user.isVerified == ''&& res.data.user.role !== 'Admin') {
            history.push('/restaurants');
            message.info("Verify your account")
            closeModal()
          }
          
          // if (res.data.status == 200 && res.data.user. == true) {
          //   history.push('/userhomepage');
          //   message.success("Login successful")
          // }
          if (res.data.status == 401 && res.data.user.role !== 'Admin') {
            history.push('/restaurants');
            return message.error('Please Login');
          }
          if (res.data.status == 200 && res.data.user.role === 'Admin') {
            console.log('admin successful login to home page');
            history.push('/admin-home');
            successfulLogin();
            localforage.setItem('user-key',res.data.user,(err,val)=>{
              if (err) {
                console.log(err)
              }
              console.log(val)
            })
          } else if (res.data.status == 300) {
            setErrorMessage('invalid email or password');
            seterrorState(true);
          }
        })
        .catch((error) => {
          console.log(error);
          setEmail(''),
          setPassword('');
        });
    }
  };

  // if (email=="demo@123.com"&&password=="demo") {
  // history.push('/home')
  // } else {
  // setEmail(''),
  // setPassword('')
  // setErrorMessage(true)
  // }
  // setIsModalVisible(false)
  const handelCancel = () => {
    setIsModalVisible(false);
  };
  // const validateMessages = {
  // // required: '${label} is required!',
  // types: {
  // email: '${label} is not a valid email!',
  // },
  // };
  const stringEmail = <FormattedMessage id="mainapp.login.e-mail" />;
  console.log('email', stringEmail);
  return (
    <div>
      <Button onClick={showModal}><IntlMessages id="mainapp.login" /></Button>
      <div className="gx-login-container">
        <Modal visible={isModalVisible} onCancel={handelCancel} destroyOnClose footer={null}>
          <div className="gx-login-header gx-text-center">
            <h1 className="gx-login-title"><IntlMessages id="mainapp.login" /></h1>
          </div>
          <Form
            name="basic"
            onFinish={onFinish}
            layout="vertical"
            onFinishFailed={onFinishFailed}
            className="gx-signin-form gx-form-row0"
          >
            <FormItem rules={[{ required: true, message: 'Please input your E-mail!' }, { type: 'email' }]} label={<IntlMessages id="mainapp.login.e-mail" />} name="email">

              <Input
                type={email}
                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormItem>
            <FormItem rules={[{ required: true, message: 'Please input your Password!' }]} label={<IntlMessages id="mainapp.login.password" />} name="password">

              <Input
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormItem>
            <p style={{ color: 'red' }}>{errorState ? errorMessage : null}</p>
            {/* <FormItem name="remember" valuePropName="checked">
<Checkbox>Remember me</Checkbox>
<Link className="gx-login-form-forgot" to="/custom-views/user-auth/forgot-password">Forgot password</Link>
</FormItem> */}
            <FormItem className="gx-text-center">
              <Button type="primary" htmlType="submit" onClick={handleLogin}>
                <IntlMessages id="mainapp.login.loginbutton" />
              </Button>
            </FormItem>
          </Form>
        </Modal>

      </div>
    </div>
  );
};

export default SignIn;
