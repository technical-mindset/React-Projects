import React from 'react';
import loading from '../Assets/loading.gif'

function Spinner() {
  return (
    <div className='d-flex justify-content-center'>
        <img src={loading} alt="loading"/>
    </div>
  )
}

export default Spinner;