import React from "react";
import NavBar from "../../component/Navbar";
import NavBarAdmin from "../../component/NavbarAdmin";
import "./admin.scss";
import Order from "./orderAdmin/Order";
const Admin = ({ children }) => {
  return (
    <>
      <NavBarAdmin />
      <div className="container-fuild mau">
        <div className="row">
          <div className="col-md-3 col-ms-6"></div>
          <div className="col-md-8 col-ms-6">{children}</div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </>
  );
};

export default Admin;
