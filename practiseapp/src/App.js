import logo from './logo.svg';
import './App.css';
import { Routes , Route } from 'react-router-dom';
import Register from './component/Register';
import Login from './component/Login';
import Navbar from './component/Navbar';

function App() {
  return (
    <div className="App">
<Navbar/>
<Routes>

<Route exact path='/Register' element={<Register/>}/>
<Route exact path='/Login' element={<Login/>}/>




</Routes>

     
    </div>
  );
}

export default App;
