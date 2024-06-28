import './App.css';
import Home from './components/Home';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Login from './components/Login';
import {Routes, Route} from "react-router-dom";
import { useState } from 'react';

function App() {
  const [auth, setAuth] = useState("null");
  return (
    <div className=''>
      <Navbar auth={auth} setAuth={setAuth}/>
      <Routes>
        <Route path="/" element={<Home auth={auth} setAuth={setAuth}/>}></Route>
        <Route path="/login" element={<Login auth={auth} setAuth={setAuth}/>}></Route>
        <Route path="/signup" element={<Signup auth={auth} setAuth={setAuth} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
