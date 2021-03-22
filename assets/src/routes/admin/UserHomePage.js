import React,{useState,useEffect} from 'react'
import UserHome from '../user/UserHome'
import HorizontalDark from './HorizontalDarkTheme'
import Axios from 'axios'
import RestaurantCard from '../user/RestaurantCard'
import {Row,Col} from 'antd'
import {Link} from 'react-router-dom'
function UserHomePage() {

    const [search, setSearch] = useState('')
    const [restaurants, setrestaurants] = useState([])

    // useEffect(() => {
    //     Axios.get(`http://localhost:1337/api/description/restaurants?text=${search}`)
    //     .then(result=>{
    //         console.log(result.data.list)
    //         setrestaurants(result.data.list)
    //     })
    //     .catch(error=>console.log(error))
    // }, [])
    const restaurantList=restaurants.length!=0?restaurants.map(restaurant=><Col key={restaurant.id} xl={6} md={8} sm={12} xs={24}><Link to={{pathname:"/restaurantdetails",restaurantId:restaurant.id }}><RestaurantCard name={restaurant.restaurantName} description={restaurant.restaurantDescription} hotelImage={restaurant.image}  grid />  </Link></Col>):<h2>No restaurants Found</h2>
    return (
        <div>
            <HorizontalDark setSearch={setSearch} search={search} setrestaurants={setrestaurants}/>
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
          </div>
        </div>
    )
}

export default UserHomePage
