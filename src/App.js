import './App.css';
import Home from './components/Home';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Login from './components/Login';
import {Routes, Route} from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup"  element={<Signup/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
