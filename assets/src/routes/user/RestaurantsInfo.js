import React,{useState,useEffect} from 'react'
import {Button, Card, Divider,Layout,Spin} from 'antd'
import ScrollAutomatically from '../components/dataDisplay/Carousel/ScrollAutomatically'
import Gallery from 'react-grid-gallery'
import Axios from 'axios'
import {footerText} from '../../util/config'
import IntlMessages from '../..//util/IntlMessages'
import RestaurantDetails from './RestaurantDetails'


function RestaurantInfo(props) {
    
   const [restaurant, setRestaurant] = useState({})
   const [restaurantStatus, setRestaurantStatus] = useState('')
   const [currentRestaurantStatus, setcurrentRestaurantStatus] = useState('')
   const [spining, setSpining] = useState(true)
   const [address, setAddress] = useState('')
   const [description, setDescription] = useState('')
    useEffect(() => {
      
     async function fetchRestaurants(){

       await Axios.get(`http://localhost:1337/api/restaurant?_id=${props.location.restaurantId}`).
        then(res=>{
            console.log(res.data.restaurant)
            setRestaurant(res.data.restaurant)
            setDescription(res.data.restaurant.description)

            if (res.data.restaurant.address=="") {
              setAddress("N/A")
            } else {
              setAddress(res.data.restaurant.address)
            }
            setSpining(false)
        })
        .catch(error=>console.log(error))
       .finally(()=>setSpining(false))
      }
      fetchRestaurants()
       
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
      setRestaurantStatus('Open now')
    }else{
      console.log("current Time",currentTime)
      console.log("open time",parseInt(restaurant.restaurantOpeningTime))   
      console.log("close time",parseInt(restaurant.restaurantClosingTime))   
      setRestaurantStatus('Closed')
    } }

    const describedWords=description.split(",")
    return (
        <div>
              <header style={style}>
      <h1 style={{float:'left',color:"white",fontFamily: 'Paytone One, sans-serif',fontSize:"40px",fontWeight:"bold"}}>Zonions</h1>
      <Button style={{float:"right"}} onClick={()=>{props.history.push('/UserHomePage')}}><IntlMessages id={"restaurantDetails.homebutton"}/></Button>  

      </header> 
        <div style={{backgroundColor:"#f5f5f5",padding:80 }}>
            <Card>
     <Spin size={"large"} spinning={spining}  >
    <div style={{    display: "grid",
    gridTemplateColumns: "50% 50%"}}>
      <div>
        <img src={restaurant.image=restaurant.image!=""?restaurant.image:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"} height={400} width={600.59} />
        </div>
        <div style={{padding:40,display:'grid',gridTemplateColumns:"30% 70%"}}>
          <div  style={{    gridColumnStart: 1,
    gridColumnEnd: 3,
    display: "flex",
    alignItems: "center"}}>
        <h1>{restaurant.name}</h1>
        { (parseInt(currentTime) >=parseInt(restaurant.openingTime)&&parseInt(currentTime)<=parseInt(restaurant.closingTime))?  
        <h3 style={{color:'green',paddingLeft:"10px"}}>(Open now)</h3> 
        : <h3 style={{color:"red",paddingLeft:"10px"}}>(Closed)</h3> 
      }
      </div>
        {/* <h3 style={{color:currentRestaurantStatus=="Open"?"green":"red"}}>{currentRestaurantStatus}</h3>  */}
        <h3><IntlMessages id={"restaurantDetails.description"}/> :-</h3> 
        {/* restaurant.restaurantDescription */}
        <p>{describedWords.map((word)=>{return word.charAt(0).toUpperCase()+word.slice(1)}).join(",") }</p>
        <h3><IntlMessages id={"restaurantDetails.address"}/>:-</h3>
        <p> {address.charAt(0).toUpperCase()+address.slice(1)} </p>
            
        <h3><IntlMessages id={"restaurantDetails.time"} /> :-</h3>
       
        <div>
        <p><IntlMessages id={"restaurantDetails.time.openingtime"}/>:-{restaurant.openingTime}</p>
        <p><IntlMessages id={"restaurantDetails.time.closingtime"}/>:-{restaurant.closingTime}</p>
        
        </div>
        </div>
        </div>
        </Spin>
         </Card>
        </div>
        
        <Footer  style={{ background: " #036" ,position: 'absolute' ,
    bottom: '0' ,
    width: '100%',
    height: '2.5rem',}}>
            <div style={{textAlign:"left",color:"white"}}>
              {footerText}
            </div>
          </Footer>
        </div>
    )
}

export default RestaurantInfo
