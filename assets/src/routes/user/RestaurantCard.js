import React from 'react'
import StarRatingComponent from 'react-star-rating-component'
import {Button} from 'antd'
import RestaurantDetails from './RestaurantDetails'

function RestaurantCard({name,description,rating,grid,hotelImage}) {
   
    return (
       
        <div className={`gx-product-item   'gx-product-vertical' `}>
        <div className="gx-product-image">
          <div className="gx-grid-thumb-equal">
            <span className="gx-link gx-grid-thumb-cover">
              <img alt="Remy Sharp" src={hotelImage=hotelImage!=""?hotelImage:'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80'}/>
            </span>
          </div>
        </div>
  
        <div className="gx-product-body">
          <h3 className="gx-product-title">{name}
            {/* <small className="gx-text-grey">{", " + variant}</small> */}
          </h3>
          {/* <div className="ant-row-flex">
            <h4>{price} </h4>
            <h5 className="gx-text-muted gx-px-2">
              <del>{mrp}</del>
            </h5>
            <h5 className="gx-text-success">{offer} off</h5>
          </div> */}
          {/* <div className="ant-row-flex gx-mb-1">
            <StarRatingComponent
              name=""
              value={rating}
              starCount={5}
              editing={false}/>
            <strong className="gx-d-inline-block gx-ml-2">{rating}</strong>
          </div> */}
          {/* <p>{description}</p> */}
        </div>
  
        <div className="gx-product-footer">
          {/* <Button variant="raised">Details</Button> */}
  
         {/* <RestaurantDetails /> */}
        </div>
      </div>
    )
}

export default RestaurantCard
