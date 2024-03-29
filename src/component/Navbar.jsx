import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logOutUser } from "../redux/slice/sliceLoginRegister";
import { changeSearch } from "../redux/slice/sliceProducts";
import { Button, Dropdown } from "antd";
import { getCustomerCart } from "../redux/action/cartAction";
const NavBar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const state = useSelector((state) => state.authReducerCart.cartList);
  const login = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();

  const sumCart = state.reduce(
    (total, currentValue) => total + currentValue.quantity,
    0
  );

  useEffect(
    () => (login === null ? "" : dispatch(getCustomerCart(login.id))),
    []
  );
  const items = [
    {
      key: "1",
      label: <NavLink to="profile/address">Sổ địa chỉ</NavLink>,
    },
    {
      key: "2",
      label: <div onClick={() => handleLogOut()}>Đăng xuất</div>,
    },
    {
      key: "3",
      label: <NavLink to="/yourOrder">Đơn hàng của bạn</NavLink>,
    },
  ];
  const handleLogOut = () => {
    dispatch(logOutUser(login));
  };
  const handleSearch = (e) => {
    const value = e.target.value;
    dispatch(changeSearch(value));
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm mobile-menu">
        <div className="container-fluid">
          <NavLink className="navbar-brand fw-bold fs-4" to="/">
            QH SHOP
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setIsMobile(!isMobile)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            //repontsive ismobile-----------------
            id={isMobile ? "mobile-menu" : "navbarSupportedContent"}
          >
            {}
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  onClick={() => setIsMobile(true)}
                  className="nav-link active"
                  aria-current="page"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/products"
                  onClick={() => setIsMobile(true)}
                >
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Contact
                </NavLink>
              </li>
              <li className="nav-item">
                <div className="navSearch">
                  <i className="fa fa-search iconSearch" aria-hidden="true"></i>
                  <input
                    type="text"
                    placeholder="Search..."
                    onChange={handleSearch}
                  />
                </div>
              </li>
            </ul>
            <div className="buttons">
              {login !== null ? (
                <>
                  <Dropdown
                    menu={{
                      items,
                    }}
                    placement="bottomLeft"
                    arrow
                  >
                    <Button>
                      {" "}
                      <i className="fa fa-user-plus me-1"></i>
                      {login.username}
                    </Button>
                  </Dropdown>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="btn btn-outline-dark "
                    onClick={() => setIsMobile(true)}
                  >
                    <i className="fa fa-sign-in me-1"></i> Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="btn btn-outline-dark  ms-2"
                    onClick={() => setIsMobile(true)}
                  >
                    <i className="fa fa-user-plus me-1"></i> Register
                  </NavLink>
                </>
              )}

              <NavLink
                to="/cart"
                className="btn btn-outline-dark  ms-2"
                onClick={() => setIsMobile(true)}
              >
                <i className="fa fa-shopping-cart me-1"></i> Cart (
                {login !== null ? sumCart : 0})
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
