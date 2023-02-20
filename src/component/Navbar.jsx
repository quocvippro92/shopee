import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const NavBar = () => {
  const [isMobile, setIsMobile] = useState(false);
  // const [search, setSearch] = useState("");
  const state = useSelector((state) => state.authReducerProduct.productByCategory);
  const login = useSelector((state) => state.authReducer.user);
  const sumCart = state.reduce(
    (total,currentValue) => total + currentValue.count,
    0
  );

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
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
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
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>
              {/* <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e)=>setSearch(e.target.value)}
                  
                />
                <button className="btn btn-outline-dark" type="submit">
                  Search
                </button>
              </form> */}
            </ul>
            <div className="buttons">
              {login !== null ? <NavLink
                  to="/login"
                  className="btn btn-outline-dark "
                  onClick={() => setIsMobile(true)}
                >
                   <i className="fa fa-user-plus me-1"></i>{login.user.username}
                </NavLink> : <>
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
              </> }
              

              <NavLink
                to="/cart"
                className="btn btn-outline-dark  ms-2"
                onClick={() => setIsMobile(true)}
              >
                <i className="fa fa-shopping-cart me-1"></i> Cart ({sumCart})
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
