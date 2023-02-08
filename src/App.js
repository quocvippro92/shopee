import "./App.css";
import Home from "./component/Home";
import NavBar from "./component/Navbar";
import Products from "./product/Products";
import { Routes, Route } from "react-router-dom";
import Product from "./product/Product.jsx";



import Web from "./component/Web";
import Cart from "./page/Cart";
import Register from "./page/Register";
import Login from "./page/Login";
import BuyCart from "./page/BuyCart";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Web />}>
          <Route path="/" element={<Home />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/products/:id" element={<Product />} />
          <Route exact path="/cart" element={<BuyCart />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
        </Route>
      </Routes>
      
    </>
  );
}

export default App;
