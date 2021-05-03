import React, { useState, useEffect } from 'react';
import {
  List, Col, Row, Result, Pagination,
} from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import RestaurantDetails from './RestaurantDetails';
import { restaurantList } from './Restaurants';
import RestaurantCard from './RestaurantCard';
import Basic from '../components/dataDisplay/Avatar/Basic';
import ScrollAutomatically from '../components/dataDisplay/Carousel/ScrollAutomatically';
import {instance,getAllrestaurants} from '../constants/Api'
function UserHome(props) {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantId, setRestaurantId] = useState('');
  const [restaurantPage, setRestaurantPage] = useState(1);
  const [restaurantPagination, setRestaurantPagination] = useState(4);

  useEffect(() => {
    // http://localhost:1337/api/card/restaurants
    // http://localhost:1337/api/restaurants?pagination=${restaurantPagination}&page=${restaurantPage}
   instance.get(getAllrestaurants).then((res)=>{
    console.log(res.data);
        setRestaurants(res.data.list);
        setRestaurantId(restaurants._id);
   })
   .catch(error=>console.log(error))
    // Axios.get('http://localhost:1337/api/card/restaurants')
    //   .then((res) => {
    //     console.log(res.data.list);
    //     setRestaurants(res.data.list);
    //     setRestaurantId(restaurants._id);
    //   })
    //   .catch((error) => console.log(error));
  }, [restaurantPage]);

  const handleCHange = (e) => {
    console.log('e from handlechange', e);

    setRestaurantPage((page) => page + 1);
  };

  document.title = 'Zonions | Restaurants';

  return (
    <div>
      <img src="" />
      <ScrollAutomatically />
      <Row>
        {
         restaurants.map((restaurant) => (
           <Col key={restaurant.id} xl={6} md={8} sm={12} xs={24}>
             <Link to={{ pathname: `/restaurantdetails/${restaurant.uid}`, restaurantId: restaurant.uid }}>
               <RestaurantCard name={restaurant.restaurantName} description={restaurant.restaurantDescription} hotelImage={restaurant.image} address={restaurant.restaurantAddress} grid />
               {' '}
             </Link>
           </Col>
         ))
        }

      </Row>
      {/* <Pagination defaultCurrent={restaurantPage} defaultPageSize={restaurantPagination} total={restaurants.length} onChange={handleCHange}/> */}
    </div>
  );/*  */
}

export default UserHome;
