import React, { useState } from 'react';
import {
  Button, Checkbox, Form, Input, Modal,
} from 'antd';
import { Link } from 'react-router-dom';
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined';
import LockOutlined from '@ant-design/icons/lib/icons/LockOutlined';

const FormItem = Form.Item;

const SignIn = (props) => {
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = (values) => {
    console.log('finish', values);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleLogin = () => {
    props.history.push('/home');

    // setIsModalVisible(false)
  };
  const handelCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <Button onClick={showModal}>Login</Button>
      <div className="gx-login-container">

        <Modal visible={isModalVisible} onCancel={handelCancel} footer={null}>

          <div className="gx-login-header gx-text-center">
            <h1 className="gx-login-title">Sign In</h1>
          </div>

          <Form
            initialValues={{ remember: true }}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="gx-signin-form gx-form-row0"
          >
            <FormItem rules={[{ required: true, message: 'Please input your E-mail!' }]} name="email">

              <Input
                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email"
              />
            </FormItem>
            <FormItem rules={[{ required: true, message: 'Please input your Password!' }]} name="password">

              <Input
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />
            </FormItem>
            <FormItem name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
              <Link className="gx-login-form-forgot" to="/custom-views/user-auth/forgot-password">Forgot password</Link>
            </FormItem>
            <FormItem className="gx-text-center">
              <Button type="primary" htmlType="submit" onClick={handleLogin}>
                Log in
              </Button>
            </FormItem>
          </Form>
        </Modal>

      </div>
    </div>
  );
};

export default SignIn;
