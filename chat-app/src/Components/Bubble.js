import React from 'react'

export const Bubble = (props) => {
  
  return (
    <div title={`${props.name}`} className={`chatbox ${props.me} px-2`}>
        <div className='alert alert-dark dot p-1 my-3'></div>
        <div className='px-1'>
        <p className={`alert alert-${props.color} d-flex bubble p-2`}>
                {props.msg}
            </p>
            </div>
    </div>
  )
}
