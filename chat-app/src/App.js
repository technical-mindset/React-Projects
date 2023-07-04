import './App.css';
import Routing from "./Routes/Routing";
import LoadingBar from 'react-top-loading-bar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkUserLoggedIn } from './Store/userSlice';
import { getAllUsers } from './Store/ulistSlice';







function App() {
  //eslint-disable-next-line

  const progress = useSelector((state) => state.loading.loading);
  const dispatch = useDispatch();


  useEffect(() => {

    dispatch(checkUserLoggedIn());
    dispatch(getAllUsers());

  }, []);

 

  return (

    <div className="">


      <LoadingBar color="#fca500" progress={progress} />

      <Routing 
      // setProgress={setProgress}
      />


    </div>

  );
}

export default App;
