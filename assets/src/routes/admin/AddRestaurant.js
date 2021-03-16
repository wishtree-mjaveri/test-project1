import React,{useState} from 'react'
import {Modal,Button,Input,Form,message,TimePicker} from 'antd'
import moment from 'moment'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
const FormItem=Form.Item
import './index.css'

function AddRestaurant(props) {
  const history=useHistory()
    const [isModelVisible, setIsModelVisible] = useState(false)
    const [restaurantName, setRestaurantName] = useState('')
    const [restaurantDescription, setrestaurantDescription] = useState('')
    const [restaurantAddress, setrestaurantAddress] = useState('')
    const [restaurantOpeningTime, setRestaurantOpeningTime] = useState('')
    const [restaurantClosingTime, setRestaurantCLosingTime] = useState('')
    const [email, setEmail] = useState('')
    const [errorMessage, seterrorMessage] = useState()
    const [errorStatus, setErrorStatus] = useState(false)
    const [image, setImage] = useState()
    const showModel = ()=>{
        setIsModelVisible(true)
    }

    const restaurantCreated=()=>{
      message.success("Restaurant Created!")
    }
    const pleaseLogin=()=>{
      message.error("Unauthorized access please login")
    }

const headers={
  headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
}

    const handleOk = async()=>{
     if (restaurantName.length==0||restaurantDescription.length==0||restaurantClosingTime.length==0||restaurantOpeningTime.length==0) {
       setErrorStatus(true)
       setIsModelVisible(true)
     } else {
     await axios.post('http://localhost:1337/api/registration',{restaurantName,restaurantDescription,restaurantAddress,restaurantOpeningTime,restaurantClosingTime,image},{headers:headers,withCredentials:true})
      .then(res=>{console.log(res.data)
        if (res.data.status==300||res.data.message=='Please Login') {
         history.push('/userHome')
          pleaseLogin()
          
        } else {
         props.refresh()
          restaurantCreated()
          setIsModelVisible(false)
          setRestaurantOpeningTime('')
          setRestaurantCLosingTime('')
          setrestaurantAddress('')
          setrestaurantDescription('')
          setRestaurantName('')
        }
      
      })  
     
    }

    }

    const handleCancel = ()=>{
        setIsModelVisible(false)
    }
    const onFileChange = (event) => {
      var file = event.target.files[0];
      var reader = new FileReader();
      reader.onloadend = function () {
        console.log("RESULT", reader.result);
        setImage(reader.result);
      };
      var res = reader.readAsDataURL(file);
      console.log("asd", res);
    };

    return (
        <div>
         
            <Button onClick={showModel}>Add New Restaurant</Button>
            <Modal title="Add New Restaurant" visible={isModelVisible} onCancel={handleCancel} onOk={handleOk} destroyOnClose footer={null}>
            <div className="gx-modal-box-form-item">
      <Form layout="vertical">
          
            <div className="gx-form-group">
<FormItem rules={[{ required: true, message: 'Please enter restaurant name!' },]} label="Restaurant Name" name="restaurantName">
            
              <Input
                
                placeholder="Enter name"
                onChange={(event) => setRestaurantName(event.target.value)}
                value={restaurantName}
                margin="none"/>
           </FormItem>
         
            </div>



            <div className="gx-form-group">
<FormItem rules={[{ required: true, message: 'Please enter description!' },]} label="Restaurant Description" name="restaurantDescription">

              <Input
                
                placeholder="Enter description"
                onChange={(event) => {setrestaurantDescription( event.target.value)}}
                value={restaurantDescription}
                margin="normal"/>
                </FormItem>
            </div>

            <div className="gx-form-group">
<FormItem rules={[{ required: true, message: 'Please enter address!' },]} label="Restaurant Address" name="restaurantAddress">

              <Input
               
                placeholder="Enter Address"
                onChange={(event) => setrestaurantAddress( event.target.value)}
                value={restaurantAddress}
                margin="normal"
              />
              </FormItem>
            </div>
            <div  style={{display:"inline-flex" ,flexWrap: 'wrap',gap: '60px'}} >
            <FormItem rules={[{ required: true, message: 'Please enter opening time!' },]}  label="Restaurant Opening Time" name="restaurantOpeningTime">

              <TimePicker
             
               format="HH:mm "
                placeholder="Enter Opening Time"
                onChange={(value) => {
                  const timeString = moment(value).format("HH:mm ");
                  setRestaurantOpeningTime(timeString)
            }}
                value={moment(restaurantOpeningTime,"HH:mm ")}
              
              />
              </FormItem>
            
            
            <FormItem rules={[{ required: true, message: 'Please enter closing time!' },]} label="Restaurant Closing Time"  name="restaurantClosingTime">

              <TimePicker
                format="HH:mm "
                value={moment(restaurantClosingTime, "HH:mm ")}
                placeholder="Enter Closing Time"
                onChange={(value) => {
                  const timeString = moment(value).format("HH:mm ");
                  setRestaurantCLosingTime(timeString)
            }}
              
                margin="normal"
              />
              </FormItem>
            </div>
            <div className="gx-form-group">
            <FormItem  label="Restaurant Image"  name="restaurantImage">
              
              <Input
               
                type='file'
                placeholder="Select image"
                onChange={(e) =>{onFileChange(e)} }
                
                margin="normal"
              />
              </FormItem>
            </div>
            <div className="gx-form-group">
            <FormItem  label="Restaurant Image"  name="restaurantImage">
              
             <img src={image} alt="No Image Selected" style={{height:"30%",width:"30%"}}  />
              </FormItem>
            </div>
            {errorStatus?errorMessage:null}
            <FormItem className="gx-text-center">
          
          <Button type="primary" htmlType='submit' onClick={handleOk}>
           submit
          </Button>
          
        </FormItem>
            </Form>
           
          </div>
         
            </Modal>
           
        </div>
    )
}

export default AddRestaurant