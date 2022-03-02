import React from 'react'
import logo from '../Assets/580b57fcd9996e24bc43c53e.png';

function Logo(props) {
  return (
    <>
     <img className={props.className} alt={props.alt} src={logo} height={props.height} width={props.width}/>
    </>
  )
}

export default Logo;