import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logOutUser } from "../redux/slice/sliceLoginRegister";
import { changeSearch } from "../redux/slice/sliceProducts";
import { Button, Dropdown } from "antd";
import "./navbarAdmin.scss";
const NavBarAdmin = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [bars, setBars] = useState(false);
  const login = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();

  const items = [
    {
      key: "1",
      label: <div onClick={() => handleLogOut()}>Đăng xuất</div>,
    },
  ];
  const handleClickBars = () => {
    setBars(!bars);
  };
  const handleLogOut = () => {
    dispatch(logOutUser(login));
  };
  const handleSearch = (e) => {
    const value = e.target.value;
    dispatch(changeSearch(value));
  };
  return (
    <div className="menu">
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm mobile-menu">
        <div className="container-fluid">
          <NavLink className="navbar-brand fw-bold fs-4" to="/">
            QH SHOP
          </NavLink>
          <div className="header-bars" onClick={() => handleClickBars()}>
            <i className="fa fa-bars" aria-hidden="true"></i>
          </div>
          <ul
            className={
              !bars
                ? "navbar-nav mx-auto mb-2 mb-lg-0 navbar__links"
                : "navbar-nav mx-auto mb-2 mb-lg-0 navbar__links open"
            }
          >
            <li className="nav-item navbar__item">
              <NavLink
                onClick={() => setIsMobile(true)}
                className="nav-link active navbar__link"
                aria-current="page"
                to="/admin/users"
              >
                Users
              </NavLink>
            </li>
            <li className="nav-item navbar__item">
              <NavLink
                className="nav-link navbar__link"
                to="/admin/product"
                onClick={() => setIsMobile(true)}
              >
                Products
              </NavLink>
            </li>
            <li className="nav-item navbar__item">
              <NavLink
                className="nav-link navbar__link"
                to="/admin"
                onClick={() => setIsMobile(true)}
              >
                Order
              </NavLink>
            </li>

            <li className="nav-item ">
              <div className="navSearch search__link">
                <i className="fa fa-search iconSearch" aria-hidden="true"></i>
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={handleSearch}
                />
              </div>
            </li>
          </ul>
          <div
            className="collapse navbar-collapse navbar-menu"
            //repontsive ismobile-----------------
            id={isMobile ? "mobile-menu" : "navbarSupportedContent"}
          >
            {}

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
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBarAdmin;
