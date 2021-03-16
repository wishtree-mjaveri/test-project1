import React,{useState,useEffect} from 'react'
import {Button, Card, Divider,Layout} from 'antd'
import ScrollAutomatically from '../components/dataDisplay/Carousel/ScrollAutomatically'
import Gallery from 'react-grid-gallery'
import Axios from 'axios'
import {footerText} from '../../util/config'


function RestaurantDetails(props) {
    
   const [restaurant, setRestaurant] = useState({})
   const [restaurantStatus, setRestaurantStatus] = useState('')
   const [currentRestaurantStatus, setcurrentRestaurantStatus] = useState('')
    useEffect(() => {
       Axios.get(`http://localhost:1337/api/restaurant?_id=${props.location.restaurantId}`).
        then(res=>{
            console.log(res.data.restaurant)
            setRestaurant(res.data.restaurant)
        })
        .catch(error=>console.log(error))
       
    }, [])
    const {Footer} =Layout
    const style={
        
            padding: '50px 40px 60px 100px',
  textAlign: 'center',
  background: ' #036',
  color: 'white',
  fontSize: '30px',
        
    }
    const currentTime=new Date().toTimeString()
    const timeStatus =()=>{ if(parseInt(currentTime) >=parseInt(restaurant.restaurantOpeningTime)&&parseInt(currentTime)<=parseInt(restaurant.restaurantClosingTime)){
      console.log("current Time",currentTime)
      console.log("open time",parseInt(restaurant.restaurantOpeningTime))   
      console.log("close time",parseInt(restaurant.restaurantClosingTime))   
      setRestaurantStatus('Open')
    }else{
      console.log("current Time",currentTime)
      console.log("open time",parseInt(restaurant.restaurantOpeningTime))   
      console.log("close time",parseInt(restaurant.restaurantClosingTime))   
      setRestaurantStatus('Close')
    } }
    return (
        <div>
              <header style={style}>
      <h1 style={{float:'left',color:"white",fontFamily: 'Paytone One, sans-serif',fontSize:"40px",fontWeight:"bold"}}>Zonions</h1>
      <Button style={{float:"right"}} onClick={()=>{props.history.push('/userHome')}}>Home</Button>  

      </header> 
        <div style={{backgroundColor:"#f5f5f5",padding:80 }}>
            <Card>
     
    <div style={{display:"flex",flexDirection:"row"}}>
        <img src={restaurant.image=restaurant.image!=""?restaurant.image:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"} height={400} width={600.59} />
     
        <div style={{padding:40}}>
        <h1>{restaurant.restaurantName}</h1>
        { (parseInt(currentTime) >=parseInt(restaurant.restaurantOpeningTime)&&parseInt(currentTime)<=parseInt(restaurant.restaurantClosingTime))?  
        <h3 style={{color:'green'}}>(Open)</h3> 
        : <h3 style={{color:"red"}}>(Close)</h3> 
      }
        {/* <h3 style={{color:currentRestaurantStatus=="Open"?"green":"red"}}>{currentRestaurantStatus}</h3>  */}
        <p>Description :-</p> 
        <h3>{restaurant.restaurantDescription}</h3>
        <p>Address :-</p>
        <h3> {restaurant.restaurantAddress} </h3>
            
       
        <div>
          <p>Time:-</p>
        <h3>OpeningTime:-{restaurant.restaurantOpeningTime}</h3>
        <h3>ClosingTime:-{restaurant.restaurantClosingTime}</h3>
        
        </div>
        </div>
        </div>
         </Card>
        </div>
        <Footer style={{ background: ' #036'}}>
            <div style={{textAlign:"left",color:"white"}}>
              {footerText}
            </div>
          </Footer>
        </div>
    )
}

export default RestaurantDetails
