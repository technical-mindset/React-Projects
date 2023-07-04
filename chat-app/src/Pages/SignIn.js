import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithGoogle, userSelector } from '../Store/userSlice';







const SignIn = (props) => {

  const [text, setText] = useState('Sign In With Google Account');
  const dispatch = useDispatch();



  const handleOnClick = () => {

    dispatch((signInWithGoogle()))
      .then(() => {

      });

    setText('Sign In With Google Account');
  }

  return (

    <div className={`container-fluid bg-dark d-flex justify-content-center align-content-center my-5 py-5 shadow`}
      style={{ flexDirection: 'column', borderRadius: '15px', boxShadow: '10px 10px lightblue', width: `${(window.screen.availWidth) >= 580 ? '25%' : '85%'}` }}>
      <div className='container d-flex justify-content-center py-2' >
        <span>
          <h3 className='text-white'><b>{text}</b></h3>
        </span>
      </div>
      <div className='container py-2 d-flex justify-content-center'>
        <button className='btn btn-outline-warning px-5 my-5' onClick={handleOnClick}> Sign in </button>
      </div>
    </div>

  )
}

export default SignIn;