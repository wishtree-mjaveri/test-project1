import Modal from 'antd/lib/modal/Modal'
import React,{useState,useEffect} from 'react'
import {Button, Input,TimePicker,Form,message} from 'antd'
import Axios from 'axios'
import {EditTwoTone} from '@ant-design/icons'
import moment from 'moment'
import {useHistory} from 'react-router-dom'
const FormItem =Form.Item


function EditRestaurant({visible,name,id,desc,address,openingTime,closingTime,refresh,image},props) {
    const [isEditModelVisible, setIsEditModelVisible] = useState(visible)
    const [restaurantName, setRestaurantName] = useState()
    const [restaurantDescription, setdescription] = useState()
    const [restaurantAddress, setrestaurantAddress] = useState()
    const [restaurantOpeningTime, setRestaurantOpeningTime] = useState()
    const [restaurantClosingTime, setRestaurantClosingTime] = useState()
    const [restaurantImage, setRestaurantImage] = useState()
    const [restaurant, setRestaurant] = useState({})
    const [requiredMark, setRequiredMark] = useState('optional')
    const history=useHistory()

    const succesfulEdit = ()=>{
      message.success("Edit successful !")
    }
    const pleaseLogin=()=>{
      message.error("Unauthorized access please login")
    }
    const onFileChange = (event) => {
      var file = event.target.files[0];
      var reader = new FileReader();
      reader.onloadend = function () {
        console.log("RESULT", reader.result);
        setRestaurantImage(reader.result);
      };
      var res = reader.readAsDataURL(file);
      console.log("asd", res);
    };

const headers={
  headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
}
    const showModel=async()=>{
     await Axios.get(`http://localhost:1337/api/restaurant?_id=${id}`).
      then(res=>{
          console.log(res.data.restaurant)
          setRestaurant(res.data.restaurant)
          setRestaurantName(res.data.restaurant.restaurantName)
          setrestaurantAddress(res.data.restaurant.restaurantAddress)
          setdescription(res.data.restaurant.restaurantDescription)
          setRestaurantOpeningTime(res.data.restaurant.restaurantOpeningTime)
          setRestaurantClosingTime(res.data.restaurant.restaurantClosingTime)
          setRestaurantImage(res.data.restaurant.image)
          console.log(restaurant)
      })
      .catch(error=>console.log(error))
  
      console.log(id)
      console.log(restaurantName)
        setIsEditModelVisible(true)
    }
    const handleOk=async ()=>{
     
      if (restaurantName.length==0||restaurantDescription.length==0||restaurantClosingTime.length==0||restaurantOpeningTime.length==0) {
        setIsEditModelVisible(true)
        
      } else {
       await Axios.put(`http://localhost:1337/api/restaurant`,{id,restaurantName,restaurantAddress,restaurantClosingTime,restaurantOpeningTime,restaurantDescription,image:restaurantImage},{headers:headers,withCredentials:true})
        .then(res=>{console.log(res.data)
          if (res.data.status=300&&res.data.message=="Please Login") {
            history.push('/userHome')
            pleaseLogin()
          } else {
            refresh()
        setIsEditModelVisible(false)
            succesfulEdit()
          }

        })
        .catch(error=>console.log(error))
       
        
      }
       
    }
    const handelCancel=()=>{
        setIsEditModelVisible(false)
    }
    const handleOnClose=()=>{
      refresh()
      setRestaurantName(name)
      setrestaurantAddress(address)
      setRestaurantOpeningTime(openingTime)
      setRestaurantClosingTime(closingTime)
      setdescription(desc)
    }
   
    return (
        <div>
            {/* <Button onClick={showModel}>Edit-{restaurantName} </Button> */}
           <EditTwoTone onClick={showModel} />
            <Modal visible={isEditModelVisible} title={"Edit Restaurant"} onOk={handleOk} onCancel={handelCancel} afterClose={handleOnClose} destroyOnClose footer={null}>
               
                <div className="gx-modal-box-form-item">
                  <Form
                  initialValues={
                    {restaurantName:restaurantName,
                    restaurantDescription:restaurantDescription,
                  restaurantOpeningTime:moment(restaurantOpeningTime, "HH:mm "),
                restaurantClosingTime:moment(restaurantClosingTime, "HH:mm "),
              }}
                  
                 layout="vertical"
                  >
            <div className="gx-form-group">
              

<FormItem rules={[{ required: true, message: 'Please enter restaurant name!' }]} label="Restaurant Name"  name="restaurantName">
           
              <Input
                value={restaurantName}
               
                onChange={(event) => setRestaurantName(event.target.value)}
                margin="none"/>
                </FormItem>
            </div>
            
            <div className="gx-form-group">
<FormItem rules={[{ required: true, message: 'Please enter description!' },]} label="Restaurant Description"  name="restaurantDescription">

              <Input
               
                placeholder="description"
                onChange={(event) => setdescription( event.target.value)}
                value={restaurantDescription}
                margin="normal"/>
                </FormItem>
            </div>
            <div className="gx-form-group">
            
<FormItem  label="Restaurant Adddress" name="Address">
              <Input
                defaultValue={address}
               
                placeholder="restaurantAddress"
                onChange={(event) => setrestaurantAddress( event.target.value)}
                value={restaurantAddress}
                margin="normal"
              />
              </FormItem>
            </div>
            <div className="gx-form-group" style={{display:"inline-flex",flexWrap:"wrap",gap:"60px"}}>
<FormItem rules={[{ required: true, message: 'Please enter closing time!' },]} label="Opening Time" name="restaurantOpeningTime">

              <TimePicker
             
               clearIcon
                format="HH:mm"
               
                placeholder="Enter Opening Time"
                value={moment(restaurantOpeningTime,"HH:mm")}

                onChange={(value) => {
                  const timeString = moment(value).format("HH:mm");
                  setRestaurantOpeningTime(timeString)}}
                margin="normal"
              />
              </FormItem>
           
              {/* <Input
                required={true}
                type='time'
                placeholder="Enter Closing Time"
                onChange={(event) => setRestaurantClosingTime( event.target.value)}
                value={restaurantClosingTime}
                margin="normal"
              /> */}
<FormItem rules={[{ required: true, message: 'Please enter closing time!' },]} label="Closing Time" name="restaurantClosingTime">

               <TimePicker
               clearIcon
                format="HH:mm"
                value={moment(restaurantClosingTime, "HH:mm")}
                placeholder="Enter Closing Time"
                onChange={(value) => {
                  const timeString = moment(value).format("HH:mm");
                  setRestaurantClosingTime(timeString)
            }}
              
                margin="normal"
              />
              </FormItem>
            </div>
            <div className="gx-form-group">
            <FormItem  label="Update Restaurant Image"  name="restaurantImage">
              
              <Input
                value={restaurantImage}
                type='file'
                placeholder="Select image"
                onChange={(e) =>{onFileChange(e)} }
                
                margin="normal"
              />
              </FormItem>
            </div>
            <div className="gx-form-group">
            <FormItem  label="Restaurant Image"  name="restaurantImage">
              
              <img src={restaurantImage} alt="Some Image" style={{height:"30%",width:"30%"}} />
              </FormItem>
            </div>
            
            <div  className="gx-form-group" style={{alignItems:"center",display: "grid",justifyContent: "center"}} >
            <Button type="primary" htmlType='submit'  onClick={handleOk}>
            
           submit
          </Button>
          </div>
          </Form>
          </div>
            </Modal>
        </div>
    )
}

export default EditRestaurant
