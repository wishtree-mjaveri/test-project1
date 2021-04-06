import React,{useState} from 'react'
import {Modal,Button,Input,Form,message,TimePicker, Upload,Tooltip} from 'antd'
import moment from 'moment'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
const FormItem=Form.Item
import './index.css'
import IntlMessages from '../../util/IntlMessages'

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
    const [errorimage, setErrorimage] = useState(false)
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

     if (restaurantName.length==0||restaurantDescription.length==0||restaurantClosingTime.length==0||restaurantOpeningTime.length==0||restaurantName.length>20) {
       setErrorStatus(true)
       setIsModelVisible(true)
     } else {
       let address = restaurantAddress.toLowerCase().trim()
       let description = restaurantDescription.toLowerCase().trim()
       console.log('new address',address)
     await axios.post('http://localhost:1337/api/registration',{restaurantName,restaurantDescription:description,restaurantAddress:address,restaurantOpeningTime,restaurantClosingTime,image},{headers:headers,withCredentials:true})
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
          setImage('')
        }
      
      })  
     
    }

    }

    const handleCancel = ()=>{
        setIsModelVisible(false)
    }
    const onFileChange = (event) => {
      setImage('')
      var file = event.file;
      var reader = new FileReader();
      var maxSize=2000000;
      if (file.size<=maxSize) {
        reader.onload = function (e) {
          const img = new Image()
          img.onload=()=>{
            setErrorimage(false)
            // seterrorMessage('')
            setImage(reader.result)
          }
          img.onerror=(error)=>{
            console.log(error)
            setErrorimage(true)
            seterrorMessage('Unable to store this image')
          }
          img.src=e.target.result
          console.log("RESULT", reader.result);
        };
      } else if(file.size>maxSize) {
        setErrorimage(true)
        seterrorMessage('unable to store image file greater than 2 mb')
      } else{
        seterrorimage(true)
        seterrorMessage("")
      }
     

      var res = reader.readAsDataURL(file);
      console.log("asd", res);
    };
    // const onFileChange = (event) => {
    //   setImage('')
    //   var file = event.target.files[0];
    //   var reader = new FileReader();
    //   var maxSize=2000000;
    //   if (file.size<=maxSize) {
    //     reader.onload = function (e) {
    //       const img = new Image()
    //       img.onload=()=>{
    //         setErrorimage(false)
    //         // seterrorMessage('')
    //         setImage(reader.result)
    //       }
    //       img.onerror=(error)=>{
    //         console.log(error)
    //         setErrorimage(true)
    //         seterrorMessage('Unable to store this image')
    //       }
    //       img.src=e.target.result
    //       console.log("RESULT", reader.result);
    //     };
    //   } else {
    //     setErrorimage(true)
    //     seterrorMessage('unable to store image file greater than 2 mb')
    //   }
     

    //   var res = reader.readAsDataURL(file);
    //   console.log("asd", res);
    // };

    const handleAfterClose=()=>{
      setImage('')
      seterrorMessage('')
    }

    return (
        <div>
         <Tooltip placement={"topLeft"} title={"Add New Restaurant"}>
            <Button onClick={showModel}> <IntlMessages id={"Addnewrestaurant.button"} /> </Button>
            </Tooltip>
            <Modal title="Add New Restaurant" visible={isModelVisible} onCancel={handleCancel} onOk={handleOk} destroyOnClose afterClose={handleAfterClose} bodyStyle={{overflowY:'auto',maxHeight:'500px',}} footer={null}>
            <div className="gx-modal-box-form-item">
      <Form layout="vertical">
          
            <div className="gx-form-group">
<FormItem rules={[{ required: true, message: 'Please enter restaurant name!' },{max:20,message:"Restaurant name must be less than or equal to 20 characters"}]} label={<IntlMessages id={"Addrestaurant.label.name"}/>} name="restaurantName">
            
              <Input
               
                placeholder="Enter name"
                onChange={(event) => setRestaurantName(event.target.value)}
                value={restaurantName}
                margin="none"/>
           </FormItem>
         
            </div>



            <div className="gx-form-group">
<FormItem rules={[{ required: true, message: 'Please enter description!' },]} label={<IntlMessages id={"Addrestaurant.label.description"}/>} name="restaurantDescription">

              <Input
                
                placeholder="Enter description"
                onChange={(event) => {setrestaurantDescription( event.target.value)}}
                value={restaurantDescription}
                margin="normal"/>
                </FormItem>
            </div>

            <div className="gx-form-group">
<FormItem rules={[{ required: true, message: 'Please enter address!' },]} label={<IntlMessages id={"Addrestaurant.label.address"}/>} name="restaurantAddress">

              <Input
               
                placeholder="Enter Address"
                onChange={(event) => setrestaurantAddress( (event.target.value))}
                value={restaurantAddress}
                margin="normal"
              />
              </FormItem>
            </div>
            <div  style={{display:"inline-flex" ,flexWrap: 'wrap',gap: '60px'}} >
            <FormItem rules={[{ required: true, message: 'Please enter opening time!' },]}  label={<IntlMessages id={"Addrestaurant.label.time"}/>} name="restaurantOpeningTime">

              <TimePicker.RangePicker
             
               format="HH:mm "
                // placeholder="Enter Opening Time"
                onChange={(e) => {
                  const start = new Date(e[0]._d)
                  console.log(start.toLocaleTimeString(navigator.language,{hour:"2-digit",minute:"2-digit"}))
                 
                  const timeString = start.toLocaleTimeString(navigator.language,{hour:"2-digit",minute:"2-digit"})
                  setRestaurantOpeningTime(timeString)
                 
                  // const timeString = moment(e[0]._d).format("HH:mm");
                  const end = new Date(e[1]._d)
                  console.log('opens-',restaurantOpeningTime)
                  const timeString2 = end.toLocaleTimeString(navigator.language,{hour:"2-digit",minute:"2-digit"})
                  console.log(end.toLocaleTimeString(navigator.language,{hour:"2-digit",minute:"2-digit"}))
                  
                  setRestaurantCLosingTime(timeString2)
                  console.log('closes-',restaurantClosingTime)
                 
                  // const timeString2 = moment(value[1]).format("HH:mm");


            }}
                value={[moment(restaurantOpeningTime,"HH:mm"),moment(restaurantClosingTime,"HH:mm")]}
              
              />
              </FormItem>
            
            
            {/* <FormItem rules={[{ required: true, message: 'Please enter closing time!' },{}]} label="Restaurant Closing Time"  name="restaurantClosingTime">

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
              </FormItem> */}
            </div>
            <div className="gx-form-group">
            <FormItem  label={<IntlMessages id={"Addrestaurant.label.image"}/>}  name="restaurantImage">
              
              {/* <Input
                accept='image/*'
                type='file'
                placeholder="Select image"
                onChange={(e) =>{onFileChange(e)} }
                
                margin="normal"
              /> */}
              <Upload
              // defaultFileList={[{uid:-1,status:"success",url:image}]}
              accept='image/*'
              type='select'
              listType="picture-card"
              className="avatar-uploader"
            
              showUploadList={{showRemoveIcon:true}}
              maxCount={1}
              onRemove={()=>{seterrorMessage("")}}
              beforeUpload={()=>false}
            onChange={onFileChange}              
              >
                <Button><IntlMessages id={"Addrestaurant.button.upload"}/> </Button>
              </Upload>
              <p >Note:-Selected image-size should be less than 2 mb and file extension of .jpg, .jpeg, .png </p>

              {errorimage?errorMessage:null}

              </FormItem>
            </div>
            {/* <div className="gx-form-group">
            <FormItem  label="Restaurant Image"  name="restaurantImage">
              
             <img src={image} alt="No Image Selected" style={{height:"30%",width:"30%"}}  />
              </FormItem>
            </div> */}

            <FormItem className="gx-text-center">
          
          <Button type="primary" htmlType='submit' onClick={handleOk}>
          <IntlMessages id={"Addrestaurant.button.submit"}/>
          </Button>
          
        </FormItem>
            </Form>
           
          </div>
         
            </Modal>
           
        </div>
    )
}

export default AddRestaurant
