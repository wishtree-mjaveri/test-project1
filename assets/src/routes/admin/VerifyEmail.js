import React,{useState} from 'react';
import {Modal,Button,Input, message} from 'antd'
import Axios from 'axios'
import OTPInput from 'react-otp-input'


function VerifyEmail() {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isOTPModalVisible, setIsOTPModalVisible] = useState(false)
    
    
    const [showModal, setShowModal] = useState(false)
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [otp2, setotp2] = useState('')
    
    const showOtpModal=()=>{
        setIsOTPModalVisible(true)
    }
    const closeOtpModal=()=>{
        setIsOTPModalVisible(false)
    }

    const handleShowModal = () => {
        setIsModalVisible(true);
    }
    const closeModal = () => {
        setIsModalVisible(false);
    }
    const handleSendOtp = ()=>{
        if (email.length>0) {
            Axios.get(`http://localhost:1337/user/email/?email=${email}`)
            .then(res=>{console.log(res.data),setotp2(res.data.user)
                if (res.data.status==301) {
                closeModal()
                message.error("User already verified")
            } if (res.data.status==300) {
                closeModal()
                message.error("No user found by this email")
            } if (res.data.status==200){message.info("OTP sent on your entered email-id") }})
            .catch(err=>console.log(err))
        } else {
            message.info("Please enter email for sending otp on it")
        }
       
        // closeModal()
    
    }
    const handleOTP = ()=>{
        if(otp.length>0){
            
        if (otp===otp2) {
            Axios.put(`http://localhost:1337/verify/?email=${email}`)
        .then(res=>{console.log(res.data),message.success("User Verified"), closeModal()})
        // closeOtpModal()
        // closeModal()
        } else {
            console.log('wrong otp')
            message.error("Wrong otp")
            closeOtpModal()
        }
    } else{
        message.info("Please enter the otp sent on your email")
    }
        
    }
    return (
        <div>
            <Button onClick={handleShowModal}>Verify User</Button>
            <Modal title={"E-mail Verification"} visible={isModalVisible} afterClose={e=>setEmail("")} onCancel={closeModal}>
        <Input placeholder={"enter email"} name="email" value={email} onChange={e=>setEmail(e.target.value)}/>
        {/* <Modal title={"Enter OTP"} visible={isOTPModalVisible} afterClose={e=>setOtp('')} footer={false} onClose={closeOtpModal}> */}
        <Button onClick={handleSendOtp}>Send OTP</Button>
            
            <OTPInput numInputs={4} value={otp} onChange={e=>setOtp(e)}  separator={<span>--</span>}/>
           
            <Button onClick={handleOTP}>check OTP</Button>

            
        {/* </Modal> */}
            </Modal>
        </div>
    )
}

export default VerifyEmail
