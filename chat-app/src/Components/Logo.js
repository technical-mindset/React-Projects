import React from 'react';
import logo from '../Img/chat1.png';


const Logo = (props) => {
  return (
    <div>
        <img className={`${props.pad}`} src={logo} style={{width:"18px"}}/>
    </div>
  )
}

export default Logo