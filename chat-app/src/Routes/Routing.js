import React from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import Chatroom from '../Pages/Chatroom';
import SignIn from '../Pages/SignIn';
import { useSelector } from 'react-redux';
import { userSelector } from '../Store/userSlice';






const Routing = (props) => {

  const user = useSelector(userSelector);


  return (
    <div>
      <Router>


        <Routes>


          <Route path='/' element={
            user ? <Navigate to={'/home'} />
              :
              <SignIn />
          } />

          <Route path='/home'

            element={
              user ?
                <Home />
                :
                <Navigate to={'/'} />
            } />

          <Route path='/chatroom/:id'

            element={
              user ? <Chatroom  />
                :
                <Navigate to={'/'} />

            } />


        </Routes>


      </Router>
    </div>
  )
}



export default Routing;