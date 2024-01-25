import './App.css';
import Home from './components/Home';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Login from './components/Login';

function App() {
  return (
    <div>
      <Navbar/>
      <Signup/>
      <Login/>
      <Home/>
    </div>
  );
}

export default App;
