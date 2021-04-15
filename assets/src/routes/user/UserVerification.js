import React from 'react';
import Axios from 'axios';
import {Layout} from 'antd'
import { footerText } from '../../util/config';


const {Footer} =Layout

function UserVerification({match}) {
    console.log(match)
    
  if (match.path === `/verify/:id`) {
    Axios.put(`http://localhost:1337/verify/${match.params.id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }
 const style = {

    padding: '50px 40px 60px 100px',
    textAlign: 'center',
    background: ' #036',
    color: 'white',
    fontSize: '30px',

  };
  return (
    <div>
      <header style={style}>
        <h1 style={{
          float: 'left', color: 'white', fontFamily: 'Paytone One, sans-serif', fontSize: '40px', fontWeight: 'bold',
        }}
        >
          Zonions
        </h1>
      </header>
      <h3>Email Verified</h3>
      <Footer style={{ background: ' #036' }}>
        <div style={{ textAlign: 'left', color: 'white' }}>
          {footerText}
        </div>
      </Footer>
    </div>
  );
}

export default UserVerification;
