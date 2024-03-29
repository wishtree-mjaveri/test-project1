import React,{useState} from "react";
import {Button, Checkbox, Form, Input,Modal} from "antd";
import Icon from '@ant-design/icons';
import {Link} from "react-router-dom";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import LockOutlined from "@ant-design/icons/lib/icons/LockOutlined";
import GoogleOutlined from "@ant-design/icons/lib/icons/GoogleOutlined";
import FacebookOutlined from "@ant-design/icons/lib/icons/FacebookOutlined";
import GithubOutlined from "@ant-design/icons/lib/icons/GithubOutlined";
import TwitterOutlined from "@ant-design/icons/lib/icons/TwitterOutlined";
import {useDispatch} from "react-redux";
import {
  hideMessage,
  showAuthLoader,
  userFacebookSignIn,
  userGithubSignIn,
  userGoogleSignIn,
  userSignIn,
  userTwitterSignIn
} from "../../../../appRedux/actions/Auth";

const FormItem = Form.Item;

const SignUP = () => {

  const dispatch = useDispatch();

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = values => {
    console.log("finish",values)
    dispatch(showAuthLoader());
    dispatch(userSignIn(values));
  };
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal=()=>{
    setIsModalVisible(true)
  }
  const handelCancel=()=>{
    setIsModalVisible(false)
  }

  const handleSignup=()=>{
    setIsModalVisible(false)
  }
  return (
    <div> 
      <Button onClick={showModal}>Signup</Button>
    <div className="gx-login-container">
      <Modal visible={ isModalVisible} onCancel={handelCancel} footer={null} >
      
        <div className="gx-login-header gx-text-center">
          <h1 className="gx-login-title">Sign Up</h1>
        </div>
        <Form
        initialValues={{ remember: true }}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="gx-signin-form gx-form-row0">

        <FormItem rules={[{ required: true, message: 'Please input your username!\'}' }]} name="uaername">

          <Input prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                 placeholder="Username"/>
        </FormItem>
        <FormItem rules={[{ required: true, message: 'Please input your E-mail!' }]} name="email">

          <Input prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                 placeholder="Email"/>
        </FormItem>
        <FormItem rules= {[{required: true, message: 'Please input your Password!'}]}  name="password">

          <Input prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                 type="password"
                 placeholder="Password"/>
        </FormItem>

          <FormItem rules= {[{required: true, message: 'Please input your Password!'}]}  name="confirm-password">
              <Input prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                     placeholder="Confirm Password"/>
          </FormItem>

        <FormItem  name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
          <Link className="gx-login-form-forgot" to="/custom-views/user-auth/forgot-password">Forgot password</Link>
        </FormItem>
          <FormItem className="gx-text-center">
            <Button type="primary" htmlType="submit" onClick={handleSignup}>
              Sign Up
            </Button>
          </FormItem>
        </Form>
        <div className="gx-flex-row">
          <span className="gx-mb-2 gx-mr-3">or Sign up using: </span>
          <ul className="gx-social-link">
            <li>
              <GoogleOutlined onClick={() => {
                dispatch(showAuthLoader());
                dispatch(userGoogleSignIn());
              }}/>
            </li>
            <li>
              <FacebookOutlined onClick={() => {
                dispatch(showAuthLoader());
                dispatch(userFacebookSignIn());
              }}/>
            </li>
            <li>
              <GithubOutlined onClick={() => {
                dispatch(showAuthLoader());
                dispatch(userGithubSignIn());
              }}/>
            </li>
            <li>
              <TwitterOutlined  onClick={() => {
                dispatch(showAuthLoader());
                dispatch(userTwitterSignIn());
              }}/>
            </li>
          </ul>
        </div>
    </Modal> 
      
      </div>
      
    </div>
  );
}

export default SignUP;
