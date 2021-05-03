import React,{useState} from 'react'
import GoogleLogin from 'react-google-login'
import axios from 'axios'
import { Button ,Modal} from 'antd'
import { Redirect } from 'react-router'
function FacebookLogin() {
    const [isvisible, setIsvisible] = useState(false)
    const [html, setHtml] = useState()
const showModal=()=>{
    setIsvisible(true)
}
const closeModal=()=>{
    setIsvisible(false)
}

    const responseFacebook =async() => {
        // setIsvisible(true)
      await axios.get('http://localhost:1337/api/v1/auth/facebook')
       .then(res=>{
   console.log(res)
            
        }).then(res=>window.open('http://localhost:1337/api/v1/auth/facebook'))
        .then(res=>console.log(res))

       
    //    .catch(err=>console.log(err))
    

      }
      const handleLogin = async (googleData) => {
        // const res = await axios("/api/v1/auth/google", {
        //     method: "POST",
        //     body: JSON.stringify({
        //     token: googleData.tokenId
        //   }),
        //   headers: {
        //     "Content-Type": "application/json"
        //   }
        // })
        console.log(googleData)
        const data = await res.json()
        // store returned user somehow
      }
    return (
        <div >
      {/* <GoogleLogin    
    clientId='206197260501-lu0i11eu48mf62tn885fi3ge3lscjasp.apps.googleusercontent.com'
    buttonText="Login"
    onSuccess={handleLogin}
    onFailure={handleLogin}
    cookiePolicy={'single_host_origin'} /> */}
    
    
{/*   
 <Modal visible={isvisible} onCancel={closeModal}> 
  <div dangerouslySetInnerHTML={{__html:html}}></div> 
  </Modal>  */}
      <Button onClick={responseFacebook}>Signin with Facebook</Button>
        </div>
    )
}

export default FacebookLogin
