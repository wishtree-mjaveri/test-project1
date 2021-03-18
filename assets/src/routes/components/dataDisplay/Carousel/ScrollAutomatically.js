import React from "react";
import {Card, Carousel} from "antd";


const ScrollAutomatically = () => {

  return (
    <Card className="gx-card" >
      <Carousel autoplay>
        <div><img src={"https://api.pizzahut.io/v1/content/en-in/in-1/images/deal/funtastic-4-veg.03ab1a9fbe04c90d033ad036573c5758.1.jpg"}/> </div>
        <div><img src={"https://api.pizzahut.io/v1/content/en-in/in-1/images/deal/one-plus-one.8050a7bd93212e2bcc08a4dde86ee028.1.jpg"}/> </div>
        <div><img src={"https://api.pizzahut.io/v1/content/en-in/in-1/images/deal/hut-meal-for-4.5b1f01acda7920439eec592a631204b0.1.jpg"}/> </div>
        <div><img src={"https://api.pizzahut.io/v1/content/en-in/in-1/images/deal/my-box-duos-wo-pepsi.c1d717df883f1f6837032e00a916d856.1.jpg"} /></div>
      </Carousel>
    </Card>
  );
};

export default ScrollAutomatically;
