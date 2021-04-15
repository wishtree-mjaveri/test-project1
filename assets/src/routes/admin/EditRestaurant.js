/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import Modal from 'antd/lib/modal/Modal';
import React, { useState, useEffect } from 'react';
import {
  Button, Input, TimePicker, Form, message, Upload, Tooltip, Spin,
} from 'antd';
import Axios from 'axios';
import { EditTwoTone } from '@ant-design/icons';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

const FormItem = Form.Item;

function EditRestaurant({
  visible, name, id, desc, address, openingTime, closingTime, refresh, image,
}, props) {
  const [isEditModelVisible, setIsEditModelVisible] = useState(visible);
  const [restaurantName, setRestaurantName] = useState();
  const [restaurantDescription, setdescription] = useState();
  const [restaurantAddress, setrestaurantAddress] = useState();
  const [restaurantOpeningTime, setRestaurantOpeningTime] = useState('');
  const [restaurantClosingTime, setRestaurantClosingTime] = useState('');
  const [restaurantImage, setRestaurantImage] = useState('');
  const [errorimage, seterrorimage] = useState(false);
  const [errorMessage, seterrorMessage] = useState('');
  const [restaurant, setRestaurant] = useState({});
  const [requiredMark, setRequiredMark] = useState('optional');
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const succesfulEdit = () => {
    message.success('Edit successful !');
  };
  const pleaseLogin = () => {
    message.error('Session expired please login');
  };
  const onFileChange = (event) => {
    setRestaurantImage('');
    const { file } = event;
    const reader = new FileReader();
    const maxSize = 2000000;
    if (file.size <= maxSize) {
      reader.onload = function (e) {
        const img = new Image();
        img.onload = () => {
          seterrorimage(false);
          // seterrorMessage('')
          setRestaurantImage(reader.result);
        };
        img.onerror = (error) => {
          console.log(error);
          seterrorimage(true);
          seterrorMessage('Unable to store this image');
        };
        img.src = e.target.result;
        console.log('RESULT', reader.result);
      };
    } else if (file.size > maxSize) {
      seterrorimage(true);
      seterrorMessage('unable to store image file greater than 2 mb');
    } else {
      seterrorimage(true);
      // seterrorMessage('Please select another file')
    }
    const res = reader.readAsDataURL(file);
    console.log('asd', res);
  };
    // const onFileChange = (event) => {
    //   setRestaurantImage('')
    //   var file = event.target.files[0];
    //   var reader = new FileReader();
    //   var maxSize=2000000;
    //   if (file.size<=maxSize) {
    //     reader.onload = function (e) {
    //       const img = new Image()
    //       img.onload=()=>{
    //         seterrorimage(false)
    //         // seterrorMessage('')
    //         setRestaurantImage(reader.result)
    //       }
    //       img.onerror=(error)=>{
    //         console.log(error)
    //         seterrorimage(true)
    //         seterrorMessage('Unable to store this image')
    //       }
    //       img.src=e.target.result
    //       console.log("RESULT", reader.result);
    //     };
    //   } else {
    //     seterrorimage(true)
    //     seterrorMessage('unable to store image file greater than 2 mb')
    //   }
    //   var res = reader.readAsDataURL(file);
    //   console.log("asd", res);
    // };

  const headers = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  // useEffect(() => {

  //   async function fetchRestaurants(){

  //     await Axios.get(`http://localhost:1337/api/restaurant?_id=${id}`).
  //      then(res=>{
  //          console.log(res.data.restaurant)
  //          setRestaurant(res.data.restaurant)
  //          setRestaurantName(res.data.restaurant.restaurantName)
  //          setrestaurantAddress(res.data.restaurant.restaurantAddress.charAt(0).toUpperCase()+res.data.restaurant.restaurantAddress.slice(1))
  //          setdescription(res.data.restaurant.restaurantDescription)
  //          setRestaurantOpeningTime(res.data.restaurant.restaurantOpeningTime)
  //          setRestaurantClosingTime(res.data.restaurant.restaurantClosingTime)
  //          setRestaurantImage(res.data.restaurant.image)

  //          if (res.data.restaurant.restaurantAddress=="") {
  //            setrestaurantAddress("N/A")
  //          } else {
  //            setrestaurantAddress(res.data.restaurant.restaurantAddress)
  //          }
  //          setLoading(false)
  //      })
  //      .catch(error=>console.log(error))
  //     .finally(()=>setLoading(false))
  //    }
  //    fetchRestaurants()

  //  }, [id])
  async function fetchRestaurants() {
    await Axios.get(`http://localhost:1337/api/restaurant?_id=${id}`)
      .then((res) => {
        console.log(res.data.restaurant);
        setRestaurant(res.data.restaurant);
        setRestaurantName(res.data.restaurant.name);
        setrestaurantAddress(res.data.restaurant.address.charAt(0).toUpperCase() + res.data.restaurant.restaurantAddress.slice(1));
        setdescription(res.data.restaurant.description);
        setRestaurantOpeningTime(res.data.restaurant.openingTime);
        setRestaurantClosingTime(res.data.restaurant.closingTime);
        setRestaurantImage(res.data.restaurant.image);
        if (res.data.restaurant.address == '') {
          setrestaurantAddress('N/A');
        } else {
          setrestaurantAddress(res.data.restaurant.address);
        }
        setLoading(false);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }
  const showModel = async () => {
    // fetchRestaurants()
    await Axios.get(`http://localhost:1337/api/restaurant?_id=${id}`)
      .then((res) => {
        console.log(res.data.restaurant);
        setRestaurant(res.data.restaurant);
        setRestaurantName(res.data.restaurant.name);
        setrestaurantAddress(res.data.restaurant.address.charAt(0).toUpperCase() + res.data.restaurant.address.slice(1));
        setdescription(res.data.restaurant.description);
        setRestaurantOpeningTime(res.data.restaurant.openingTime);
        setRestaurantClosingTime(res.data.restaurant.closingTime);
        setRestaurantImage(res.data.restaurant.image);
        // console.log(restaurant)
        // console.log(restaurantImage)
        console.log(res.data.restaurant.openingTime);
      })
      .catch((error) => console.log(error));

    console.log(id);
    console.log(restaurantName);
    setIsEditModelVisible(true);
    setLoading(false);
  };
  const handleOk = async () => {
    const address = restaurantAddress.toLowerCase();
    const description = restaurantDescription.toLowerCase();
    if (restaurantName.length == 0 || restaurantDescription.length == 0 || restaurantClosingTime.length == 0 || restaurantOpeningTime.length == 0 || restaurantName.length > 20) {
      setIsEditModelVisible(true);
    } else {
      await Axios.put('http://localhost:1337/api/restaurant', {
        id, restaurantName, restaurantAddress: address, restaurantClosingTime, restaurantOpeningTime, restaurantDescription: description, image: restaurantImage,
      }, { headers:headers.headers, withCredentials: true })
        .then((res) => {
          console.log(res.data);
          if (res.data.status = 300 && res.data.message == 'Please Login') {
            history.push('/userHome');
            pleaseLogin();
          } else {
            refresh();
            setIsEditModelVisible(false);
            succesfulEdit();
          }
        })
        .catch((error) => console.log(error));
    }
  };
  const handelCancel = () => {
    setIsEditModelVisible(false);
  };
  const handleOnClose = () => {
    refresh();
    setRestaurantName(name);
    setrestaurantAddress(address);
    setRestaurantOpeningTime(openingTime);
    setRestaurantClosingTime(closingTime);
    setdescription(desc);
    seterrorMessage('');
  };
  //  let imageUrl=restaurantImage!=""?restaurantImage:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
  // let imageUrl=restaurantImage!=""?restaurantImage:null;
  const defaultFileList = restaurantImage != '' ? [{ uid: -1, status: 'done', url: restaurantImage }] : null;
  return (
    <div>

      {/* <Button onClick={showModel}>Edit-{restaurantName} </Button> */}

      <Tooltip placement="topLeft" title="Edit Restaurant">
        {' '}
        <EditTwoTone onClick={showModel} />
      </Tooltip>

      <Modal visible={isEditModelVisible} title="Edit Restaurant" onOk={handleOk} onCancel={handelCancel} afterClose={handleOnClose} destroyOnClose bodyStyle={{ overflowY: 'auto', maxHeight: '500px' }} footer={null}>

        <div className="gx-modal-box-form-item">
          <Spin spinning={loading} tip="loading...">

            <Form
              initialValues={
                    {
                      restaurantName,
                      restaurantDescription,
                      restaurantImage,

                    }
}

              layout="vertical"
            >
              <div className="gx-form-group">

                <FormItem rules={[{ required: true, message: 'Please enter restaurant name!' }, { max: 20, message: 'Restaurant name must be less than or equal to 20 characters' }]} label="Restaurant Name" name="restaurantName">

                  <Input
                    value={restaurantName}

                    onChange={(event) => setRestaurantName(event.target.value)}
                    margin="none"
                  />
                </FormItem>
              </div>

              <div className="gx-form-group">
                <FormItem rules={[{ required: true, message: 'Please enter description!' }]} label="Restaurant Description" name="restaurantDescription">

                  <Input

                    placeholder="description"
                    onChange={(event) => setdescription(event.target.value)}
                    value={restaurantDescription}
                    margin="normal"
                  />
                </FormItem>
              </div>
              <div className="gx-form-group">

                <FormItem label="Restaurant Adddress" name="Address">
                  <Input
                    defaultValue={address}

                    placeholder="restaurantAddress"
                    onChange={(event) => setrestaurantAddress(event.target.value)}
                    value={restaurantAddress}
                    margin="normal"
                  />
                </FormItem>
              </div>
              <div className="gx-form-group" style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '60px' }}>
                <FormItem rules={[{ required: true, message: 'Please enter closing time!' }]} label="Restaurant Time" name="restaurantOpeningTime">

                  <TimePicker.RangePicker

                    clearIcon
                    format="HH:mm"

                    placeholder="Enter Opening Time"
                    defaultValue={[moment(restaurantOpeningTime, 'HH:mm'), moment(restaurantClosingTime, 'HH:mm')]}

                    onChange={(e) => {
                      const start = new Date(e[0]._d);
                      const end = new Date(e[1]._d);
                      const timeString = start.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
                      const timeString2 = end.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
                      setRestaurantClosingTime(timeString2);
                      setRestaurantOpeningTime(timeString);
                    }}
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
                {/* <FormItem rules={[{ required: true, message: 'Please enter closing time!' },]} label="Closing Time" name="restaurantClosingTime">

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
              </FormItem> */}
              </div>
              <div className="gx-form-group">
                <FormItem label="Update Restaurant Image" name="restaurantImage">

                  {/* <Input
                accept="image/*"
                // value={restaurantImage}
                type='file'
                placeholder="Select image"
                onChange={(e) =>{onFileChange(e)} }

                margin="normal"
              /> */}
                  <Upload
                    defaultFileList={defaultFileList}
                    accept="image/*"
                    type="select"
                    listType="picture-card"
                    showUploadList={{ showRemoveIcon: true, showPreviewIcon: false }}
                    onRemove={() => seterrorMessage('No image selected')}
                    className="avatar-uploader"
                    maxCount={1}
                    beforeUpload={() => false}
                    onChange={onFileChange}
                  >

                    <Button>Upload</Button>
                  </Upload>
                  <p>Note:-Selected image-size should be less than 2 mb and file extension of .jpg, .jpeg, .png </p>

                  {errorimage ? errorMessage : null}

                </FormItem>
              </div>
              {/* <div className="gx-form-group">
            <FormItem  label="Restaurant Image"  name="restaurantImage">

              <img src={restaurantImage} alt="Some Image" style={{height:"30%",width:"30%"}} />
              </FormItem>
            </div> */}

              <div className="gx-form-group" style={{ alignItems: 'center', display: 'grid', justifyContent: 'center' }}>
                <Button type="primary" htmlType="submit" onClick={handleOk}>

                  Submit
                </Button>
              </div>
            </Form>

          </Spin>
        </div>

      </Modal>

    </div>
  );
}

export default EditRestaurant;
