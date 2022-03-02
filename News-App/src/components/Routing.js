import { React, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Nav from './Nav';
import News from './News';
import LoadingBar from 'react-top-loading-bar';

export default function Routing() {
  const [progress,setProgress] = useState(0);
  const [country] = useState('ca');
 

  
  return (
    <div>
<Router>
        <Nav />
        <LoadingBar color="#fca500" progress={progress}
        />
        <Routes>
          <Route exact path="/sports" element={<News setProgress={setProgress}  key={'sports'} country={country} category={'sports'} />} />
          <Route exact path="/business" element={<News setProgress={setProgress}  key={'business'} country={country} category={'business'} />} />
          <Route exact path="/health" element={<News setProgress={setProgress}  key={'health'} country={country} category={'health'} />} />
          <Route exact path="/technology" element={<News setProgress={setProgress}  key={'technology'} country={country} category={'technology'} />} />
          <Route exact path="/" element={<News setProgress={setProgress}  key={'home'} country={country} category={'general'} />} />
          <Route exact path="/science" element={<News setProgress={setProgress}  key={'science'} country={country} category={'science'} />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress}  key={'entertainment'} country={country} category={'entertainment'} />} />
          <Route exact path="/general" element={<News setProgress={setProgress}  key={'general'} country={country} category={'general'} />} />
        </Routes>
      </Router>            
  
    </div>
  )
}

