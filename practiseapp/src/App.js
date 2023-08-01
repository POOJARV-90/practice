import logo from './logo.svg';
import './App.css';
import { Routes , Route } from 'react-router-dom';
import Register from './component/Register';
import Login from './component/Login';
import Navbar from './component/Navbar';
import Home from './component/Home';
import AddProduct from './component/AddProduct';
import AllProducts from './component/AllProducts';
import Singlepoduct from './component/Singlepoduct';
import Cart from './component/Cart';


function App() {
  return (
    <div className="App">
<Navbar/>
<Routes>
<Route exact path='/' element={<Home/>}/>
<Route exact path='/Register' element={<Register/>}/>
<Route exact path='/Login' element={<Login/>}/>
<Route exact path='/Addproduct' element={<AddProduct />} />
<Route exact path='/AllProducts' element={<AllProducts />} />
<Route exact path='/Singlepoduct/:id' element={<Singlepoduct/>} />
<Route exact path='/Cart' element={<Cart/>} />


</Routes>

     
    </div>
  );
}

export default App;
