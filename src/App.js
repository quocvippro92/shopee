import "./App.css";
import Home from "./component/Home";
import NavBar from "./component/Navbar";
import Products from "./product/Products";
import { Routes, Route } from "react-router-dom";
import Product from "./product/Product.jsx";
import Web from "./component/Web";
import Register from "./page/auth/Register";
import Login from "./page/auth/Login";
import { useSelector } from "react-redux";
import BuyCart from "./page/cart/BuyCart";

function App() {
  const login = useSelector(state=>state.authReducer.user)
  return (
    <>
      <Routes>
        <Route path="/" element={<Web />}>
          <Route path="/" element={<Home />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/products/:id" element={<Product />} />
          <Route exact path="/cart" element={<BuyCart />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={login === null ?<Login /> : <Home/>} />
        </Route>
      </Routes>
      
    </>
  );
}

export default App;
