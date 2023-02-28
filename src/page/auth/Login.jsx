import React from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/action/actionLoginRegister";





function Login() {
  const dispatch = useDispatch();
  
  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Invalid Email")
        .required("your must fill in this section!"),
      password: yup
        .string()
        .min(8, "Your name must be at least 8 characters!")
        .required("your must fill inn this section!"),
    }),
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });


  return (
    <>
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow>
        <MDBCol col="10" md="6">
          <img
            src="/assets/anh1.jpg"
            className="card-img"
            alt="Background"
            height={550}
          />
        </MDBCol>
        <MDBCol col="4" md="6">
          <div className="d-flex flex-row align-items-center justify-content-center">
            <p className="lead fw-normal mb-0 me-3 fs-2 fw-bold">
              Sign in with
            </p>

            <MDBBtn floating size="md" tag="a" color="dark" className="me-2">
              <i className="fa fa-facebook" aria-hidden="true"></i>
            </MDBBtn>

            <MDBBtn floating size="md" tag="a" color="dark" className="me-2">
              <i className="fa fa-instagram" aria-hidden="true"></i>
            </MDBBtn>

            <MDBBtn floating size="md" tag="a" color="dark" className="me-2">
              <i className="fa fa-twitter" aria-hidden="true"></i>
            </MDBBtn>
          </div>

          <div className="divider  align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0 border-bottom"></p>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label fw-bold ">Email</label>
              <div className="col-sm-8">
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className="form-control"
                  placeholder="Email..."
                  id="inputEmail3"
                />
                <div>
                  {formik.errors.email && formik.touched.email && (
                    <p className="erro">{formik.errors.email}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label fw-bold ">
                password
              </label>
              <div className="col-sm-8">
                <input
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  placeholder="password"
                  className="form-control"
                />
                <div>
                  {formik.errors.password && formik.touched.password && (
                    <p className="erro">{formik.errors.password}</p>
                  )}
                </div>
                <div className="d-flex justify-content-between mb-4">
                  <MDBCheckbox
                    name="flexCheck"
                    value=""
                    id="flexCheckDefault"
                    label="Remember me"
                  />
                  <a href="!# fs-3">Forgot password?</a>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-outline-dark w-25 " >
              Sign in
            </button>
          </form>

          <div className="text-center text-md-start mt-4 pt-2">
            <p className="small fw-bold mt-2 pt-1 mb-2 fs-3">
              Don't have an account? <NavLink to="/register">Register</NavLink>
            </p>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </>
  );
}

export default Login;
