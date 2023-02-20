import "./App.css";
import Home from "./component/Home";
import { Routes, Route } from "react-router-dom";
import Web from "./component/Web";
import Register from "./page/auth/Register";
import Login from "./page/auth/Login";
import { useSelector } from "react-redux";
import BuyCart from "./page/cart/BuyCart";
import { ROUTER } from "./const";
import Products from "./page/product/Products";
import Product from "./page/product/Product";

function App() {
  const login = useSelector(state=>state.authReducer.user)
  return (
    <>
      <Routes>
        <Route path={ROUTER.home} element={<Web />}>
          <Route path={ROUTER.home} element={<Home />} />
          <Route exact path={ROUTER.products} element={<Products />} />
          <Route exact path={ROUTER.products_id} element={<Product />} />
          <Route exact path={ROUTER.cart} element={<BuyCart />} />
          <Route exact path={ROUTER.register} element={<Register />} />
          <Route exact path={ROUTER.login} element={login ===null ? <Login /> : <Home/> } />
        </Route>
      </Routes>
      
    </>
  );
}

export default App;
