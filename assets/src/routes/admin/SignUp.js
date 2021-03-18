import React,{useState} from "react";
import {Button, Checkbox, Form, Input,Modal,message} from "antd";
import Icon from '@ant-design/icons';
import {Link} from "react-router-dom";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import LockOutlined from "@ant-design/icons/lib/icons/LockOutlined";
import GoogleOutlined from "@ant-design/icons/lib/icons/GoogleOutlined";
import FacebookOutlined from "@ant-design/icons/lib/icons/FacebookOutlined";
import GithubOutlined from "@ant-design/icons/lib/icons/GithubOutlined";
import TwitterOutlined from "@ant-design/icons/lib/icons/TwitterOutlined";
import {useDispatch} from "react-redux";
import Axios from "axios"


const FormItem = Form.Item;

const SignUP = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
const [errorState, setErrorState] = useState(false)  

  
  const [isModalVisible, setIsModalVisible] = useState(false)

  const successfulRegisteration = ()=>{
    message.success("User registration successful !!! ")
  }

  const showModal=()=>{
    setIsModalVisible(true)
  }
  const handelCancel=()=>{
    setIsModalVisible(false)
  }
  const clean=()=>{
      setUsername("")
      setPassword("")
      setEmail("")
      setConfirmPassword("")
  }
  const handleSignup=()=>{
    if (email.length==0||username.length==0||password.length==0||confirmPassword.length==0) {

        setIsModalVisible(true)
    } else {
      if(confirmPassword===password){
       
       Axios.post(`http://localhost:1337/user/registration`,{email,username,password})
       .then(res=>{console.log(res.data)
    if (res.data.status==200) {
        setIsModalVisible(false)
        successfulRegisteration()
    } else {
        setErrorState(true)
        setErrorMessage('user exist with this email')
        setEmail("")
        setIsModalVisible(true)
    }
    })

      }
     
        
    }

  }
  return (
    <div> 
      <Button onClick={showModal}>Signup</Button>
    <div className="gx-login-container">
      <Modal visible={ isModalVisible} onCancel={handelCancel} destroyOnClose footer={null} >
      
        <div className="gx-login-header gx-text-center">
          <h1 className="gx-login-title">Sign Up</h1>
        </div>
        <Form
       
        name="basic"
        layout="vertical"
        className="gx-signin-form gx-form-row0">

        <FormItem rules={[{ required: true, message: 'Please input your username!\'}' }]} label="Username" name="username">

          <Input prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                 placeholder="Username" value={"username"} onChange={e=>{setUsername(e.target.value)}} />
        </FormItem>
        <FormItem rules={[{ required: true, message: 'Please input your E-mail!' },{type:'email'}]} label="E-mail" name="email">

          <Input prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                 placeholder="Email" value={"email"} onChange={e=>{setEmail(e.target.value)}} />
        </FormItem>
        <FormItem rules= {[{required: true, message: 'Please input your Password!'}]} label="Password" name="password">

          <Input prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                 type="password"
                 placeholder="Password" value={"password"} onChange={e=>setPassword(e.target.value)} />
        </FormItem>

          <FormItem rules= {[{required: true, message: 'Please input your Password!'},({getFieldValue})=>({validator(_,value){ if(!value||getFieldValue('password')===value){return Promise.resolve()} return Promise.reject(new Error("confirm password dosen't match"))}})]} label="Confirm Password" name="confirm-password" dependencies={['password']}  hasFeedback>
              <Input prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                     placeholder="Confirm Password" value={"confirmpassword"} onChange={e=>setConfirmPassword(e.target.value)} />
          </FormItem>
    {errorState?errorMessage:null}
        <FormItem  name="remember" valuePropName="checked">
          {/* <Checkbox>Remember me</Checkbox>
          <Link className="gx-login-form-forgot" to="/custom-views/user-auth/forgot-password">Forgot password</Link> */}
        </FormItem>
          <FormItem className="gx-text-center">
            <Button type="primary" htmlType="submit" onClick={handleSignup}>
              Sign Up
            </Button>
          </FormItem>
        </Form>
      
    </Modal> 
      
      </div>
      
    </div>
  );
}

export default SignUP;
