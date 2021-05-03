import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Row, Col, Layout } from 'antd';
import { Link } from 'react-router-dom';
import UserHome from '../user/UserHome';
import HorizontalDark from './HorizontalDarkTheme';
import RestaurantCard from '../user/RestaurantCard';
import { footerText } from '../../util/config';

function UserHomePage() {
  const { Footer } = Layout;
  const [search, setSearch] = useState('');
  const [restaurants, setrestaurants] = useState([]);

  // useEffect(() => {
  //     Axios.get(`http://localhost:1337/api/description/restaurants?text=${search}`,{withCredentials:true})
  //     .then(result=>{
  //         console.log(result.data.list)
  //         setrestaurants(result.data.list)
  //     })
  //     .catch(error=>console.log(error))
  // }, [])
  const restaurantList = restaurants.length != 0 ? restaurants.map((restaurant) => (
    <Col key={restaurant.id} xl={6} md={8} sm={12} xs={24}>
      <Link to={{ pathname: '/restaurantinfo', restaurantId: restaurant.uid }}>
        <RestaurantCard name={restaurant.restaurantName} description={restaurant.restaurantDescription} hotelImage={restaurant.image} address={restaurant.restaurantAddress} grid />
        {' '}
      </Link>
    </Col>
  )) : <h2>No restaurants Found</h2>;
  document.title="Zonions"
  return (
    <div>
      <HorizontalDark setSearch={setSearch} search={search} setrestaurants={setrestaurants} />
      <div className="ant-layout-content gx-layout-content gx-container-wrap ">
        <div className="gx-main-content-wrapper ">
          <Row>
            {
    //  restaurantList=restaurants.length!=0?restaurants.map(restaurant=><Col key={restaurant.id} xl={6} md={8} sm={12} xs={24}><Link to={{pathname:"/restaurantdetails",restaurantId:restaurant.id }}><RestaurantCard name={restaurant.restaurantName} description={restaurant.restaurantDescription} hotelImage={restaurant.image}  grid />  </Link></Col>):<h2>No restaurants Found</h2>
         restaurantList
        //  restaurants.map(restaurant=><Col key={restaurant.id} xl={6} md={8} sm={12} xs={24}><Link to={{pathname:"/restaurantdetails",restaurantId:restaurant.id }}><RestaurantCard name={restaurant.restaurantName} description={restaurant.restaurantDescription} hotelImage={restaurant.image}  grid />  </Link></Col>)
        }

          </Row>
        </div>
        <Footer style={{
          background: ' #036',
          position: 'absolute',
          bottom: '0',
          width: '100%',
          height: '2.5rem',
        }}
        >
          <div style={{ textAlign: 'left', color: 'white' }}>
            {footerText}

          </div>
        </Footer>
      </div>
    </div>
  );
}

export default UserHomePage;
