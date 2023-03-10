import "./App.scss";
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
import Address from "./page/profileAddress/Address";
import Delivery from "./page/profileAddress/Delivery";
import YourOrder from "./page/cart/YourOrder";
import LoginAdmin from "./page/Admin/LoginAdmin";
import PageAdmin from "./page/Admin/PageAdmin";
import ProductAdmin from "./page/Admin/productAdmin/ProductAdmin";
import UsersAdmin from "./page/Admin/usersAdmin/UsersAdmin";
import Order from "./page/Admin/orderAdmin/Order";
function App() {
  const login = useSelector((state) => state.authReducer.user);
  return (
    <>
      <Routes>
        <Route path={ROUTER.home} element={<Web />}>
          <Route path={ROUTER.home} element={<Home />} />
          <Route exact path={ROUTER.products} element={<Products />} />
          <Route exact path={ROUTER.products_id} element={<Product />} />
          <Route exact path={ROUTER.cart} element={<BuyCart />} />
          <Route exact path={ROUTER.register} element={<Register />} />
          <Route
            exact
            path={ROUTER.login}
            element={login === null ? <Login /> : <Home />}
          />
          <Route exact path={ROUTER.address} element={<Address />} />
          <Route
            exact
            path={ROUTER.delivery}
            element={login === null ? <Login /> : <Delivery />}
          />
          <Route path={ROUTER.yourOrder} element={<YourOrder />} />
        </Route>
        <Route
          path={ROUTER.admin}
          element={
            login === null ? (
              <LoginAdmin />
            ) : login.admin === "admin" ? (
              <PageAdmin />
            ) : (
              <LoginAdmin />
            )
          }
        >
          <Route path={ROUTER.adminProduct} element={<ProductAdmin />} />
          <Route path={ROUTER.admin} element={<Order />} />
          <Route path={ROUTER.adminUsers} element={<UsersAdmin />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
