/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable max-len */
/* eslint-disable radix */
/* eslint-disable react/prop-types */
/* eslint-disable eqeqeq */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Button, Card, Divider, Layout, Spin, Tooltip,
} from 'antd';
import Gallery from 'react-grid-gallery';
import Axios from 'axios';
import Loader from 'react-loader-spinner';
import IntlMessages from '../../util/IntlMessages';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import ShowMoreText from 'react-show-more-text';
import ShowMore from 'react-show-more';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import ReadMore from 'read-more-react';
import { footerText } from '../../util/config';
import ScrollAutomatically from '../components/dataDisplay/Carousel/ScrollAutomatically';
import {instance,getRestaurant} from '../constants/Api'
function RestaurantDetails(props) {
  const [restaurant, setRestaurant] = useState({});
  const [restaurantStatus, setRestaurantStatus] = useState('');
  const [currentRestaurantStatus, setcurrentRestaurantStatus] = useState('');
  const [address, setAddress] = useState('');
  const [spining, setSpining] = useState();
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [showToolTip, setShowToolTip] = useState(true);
  useEffect(() => {
    async function fetchRestaurants() {
      await 
      // Axios.get(`http://localhost:1337/api/restaurant?_id=${props.location.restaurantId}`)
      instance.get(getRestaurant,{ params:{uid:props.location.restaurantId}})  
      .then((res) => {
          console.log(res.data.restaurant[0]);
          setRestaurant(res.data.restaurant[0]);
          setDescription(res.data.restaurant[0].restaurantDescription);
          if (res.data.restaurant[0].restaurantAddress == '') {
            setAddress('N/A');
          } else {
            setAddress(res.data.restaurant[0].restaurantAddress);
          }
          setLoading(false);
        })
        .catch((error) => {console.log(error)
        props.history.push('/restaurants')
        
        })
        .finally(() => setSpining(false));
    }
    fetchRestaurants();
  }, []);
  const { Footer } = Layout;
  const style = {

    padding: '50px 40px 60px 100px',
    textAlign: 'center',
    background: ' #036',
    color: 'white',
    fontSize: '30px',

  };

  const describedWords = description.split(',');

  const currentTime = new Date().toTimeString();
  const timeStatus = () => {
    if (parseInt(currentTime) >= parseInt(restaurant.restaurantOpeningTime) && parseInt(currentTime) <= parseInt(restaurant.restaurantClosingTime)) {
      console.log('current Time', currentTime);
      console.log('open time', parseInt(restaurant.restaurantOpeningTime));
      console.log('close time', parseInt(restaurant.restaurantClosingTime));
      setRestaurantStatus('Open now');
    } else {
      console.log('current Time', currentTime);
      console.log('open time', parseInt(restaurant.restaurantOpeningTime));
      console.log('close time', parseInt(restaurant.restaurantClosingTime));
      setRestaurantStatus('Closed');
    }
  };
  const handleTooltip = () => {
    setShowToolTip(false);
  };

  document.title = 'Zonions | Restaurant Details';
  return (
    <div>

      <header style={style}>
        <h1 style={{
          float: 'left', color: 'white', fontFamily: 'Paytone One, sans-serif', fontSize: '40px', fontWeight: 'bold',
        }}
        >
          Zonions
        </h1>
        <Button style={{ float: 'right' }} onClick={() => { props.history.push('/restaurants'); }}>
          <IntlMessages id="restaurantDetails.homebutton" />
          {' '}
        </Button>

      </header>
      <div style={{ backgroundColor: '#f5f5f5', padding: 80 }}>
        <Card>
          <Spin size="large" spinning={loading} tip="Loading...">
            {/* <Loader
     visible={loading}
     type="Grid"
        color="#00BFFF"
        height={100}
        width={100}

       ></Loader> */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '50% 50%',
            }}
            >
              <div>
                <img src={restaurant.image = restaurant.image != '' ? restaurant.image : 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'} height={400} width={600.59} />
              </div>
              <div style={{ padding: 40, display: 'grid', gridTemplateColumns: '30% 70%' }}>
                <div style={{
                  gridColumnStart: 1,
                  gridColumnEnd: 3,
                  display: 'flex',
                  alignItems: 'center',
                }}
                >
                  <ShowMore more="more" less="less">
                  <h1 style={{wordBreak:'break-all'}}>{restaurant.restaurantName}</h1>
                  </ShowMore>
                  { (parseInt(currentTime) >= parseInt(restaurant.restaurantOpeningTime) && parseInt(currentTime) <= parseInt(restaurant.restaurantClosingTime))
                    ? <h3 style={{ flex:'none',color: 'green', paddingLeft: '10px' }}>(Open now)</h3>
                    : <h3 style={{ flex:'none',color: 'red', paddingLeft: '10px' }}>(Closed)</h3>}
                </div>
                {/* <h3 style={{color:currentRestaurantStatus=="Open"?"green":"red"}}>{currentRestaurantStatus}</h3>  */}

                <h3>
                  <IntlMessages id="restaurantDetails.description" />
                  :-
                </h3>
                <p style={{ wordBreak: 'break-all' }}>
                  <Tooltip placement="topLeft" overlayInnerStyle={{ overflowY: 'scroll', textSizeAdjust: 'auto', height: '60px' }} title={describedWords.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(',')}>
                    {/* <ReadMore text={description}  r{eadMoreText={"read more"} /> */}
                    <ShowMore lines={3} more="more" less="less">
                      { describedWords.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(',') }
                      {/* {description} */}
                    </ShowMore>
                  </Tooltip>

                </p>
                {/* description.charAt(0).toUpperCase()+description.slice(1) */}
                {/* describedWords.map((word)=>{return word[0].toUpperCase()+word.slice(1)}).join(",") */}
                <h3>
                  <IntlMessages id="restaurantDetails.address" />
                  :-
                </h3>
                {/* address.charAt(0).toUpperCase()+address.slice(1) */}
                <p style={{ overflowY: 'auto', wordBreak: 'break-all', maxHeight:"100px" }}>
                  <Tooltip placement="topLeft" destroyTooltipOnHide title={address.charAt(0).toUpperCase() + address.slice(1)}>
                    {address.charAt(0).toUpperCase() + address.slice(1) }
                  </Tooltip>
                </p>

                <h3>
                  <IntlMessages id="restaurantDetails.time" />
                  :-
                </h3>

                <div>
                  <p>
                    <IntlMessages id="restaurantDetails.time.openingtime" />
                    :-
                    {restaurant.restaurantOpeningTime}
                  </p>
                  <p>
                    <IntlMessages id="restaurantDetails.time.closingtime" />
                    :-
                    {restaurant.restaurantClosingTime}
                  </p>

                </div>
              </div>
            </div>
          </Spin>
        </Card>
      </div>
      <Footer style={{ background: ' #036' }}>
        <div style={{ textAlign: 'left', color: 'white' }}>
          {footerText}
        </div>
      </Footer>
    </div>
  );
}

export default RestaurantDetails;
