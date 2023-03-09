import React from "react";
import { Outlet } from "react-router-dom";
import Admin from "./Admin";

const PageAdmin = () => {
  return (
    <Admin>
      <Outlet />
    </Admin>
  );
};

export default PageAdmin;
