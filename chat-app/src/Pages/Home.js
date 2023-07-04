import React from 'react';
import img from '../Img/chat.png';
import List from '../Components/List';

const Home = (props) => {
  
  return (
    <div>
      
        <List name={'Chat App'} image={img}
        //  setProgress={props.setProgress}
         />
       
    </div>
  )
}

export default Home;