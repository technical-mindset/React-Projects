import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOutWithGoogle } from '../Store/userSlice';
import { useDispatch } from 'react-redux';
import { setLoading } from '../Store/loadingSlice';


const SignOut = (props) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>
      <button className='btn btn-success' onClick={(e) => {
        e.preventDefault();

        dispatch(setLoading(50));

        dispatch(signOutWithGoogle())

        dispatch(setLoading(100));
        navigate('/');
      }}
      >
        Signout</button>
    </div>
  )
}

export default SignOut