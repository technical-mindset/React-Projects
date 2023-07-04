import React from 'react';
import spinner from '../Img/spinner.svg';

function Spinner(props) {
  return (
    <div className='d-flex justify-content-center'>
      <embed className={`${props.width ? props.width : 'w-50'}`}
        src={`${spinner}`} type="image/svg+xml" />
    </div>
  )
}

export default Spinner;