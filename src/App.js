
import './App.css';
import Home from './component/Home';
import NavBar from './component/Navbar';
import Products from './component/Products';
import { Routes ,Route } from 'react-router-dom';
import Product from './component/Product';
import Cart from './component/Cart';
import Register from './component/Register';
import Login from './component/Login';


function App() {
  return (
   <>
   <NavBar/>
   <Routes>
      <Route exact path='/' element = {<Home/>}/>
      <Route exact path='/products' element = {<Products/>}/>
      <Route exact path='/products/:id' element = {<Product/>}/>
      <Route exact path='/cart' element = {<Cart/>}/>
      <Route exact path='/register' element = {<Register/>}/>
      <Route exact path='/login' element = {<Login/>}/>
   </Routes>
   </>
  );
}

export default App;
