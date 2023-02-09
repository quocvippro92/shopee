
import React from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { useFormik } from "formik";
import * as yup from "yup";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchRegister } from "../../redux/slice/authSlice";


function Register() {
  const dispatch= useDispatch()
  const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  const formik = useFormik({
    initialValues: {
      username: "",
      address: "",
      phone: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .min(5, "your name must be at least 5 characters!")
        .max(30, "your name must be under 30 characters")
        .required("you have not entered name"),
      email: yup
        .string()
        .email("Invalid Email")
        .required("your must fill in this section!"),
      phone: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("required to enter number"),
      address: yup.string().required("your must fill in this section!"),
      password: yup
        .string()
        .min(8, "Your name must be at least 8 characters!")
        .required("your must fill inn this section!"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "password does not match!")
        .required("your must fill in this section!"),
    }),
    onSubmit: (values) => {
      dispatch(fetchRegister(values))
    },
  });
  return (
    <MDBContainer >
      <MDBRow className="d-flex justify-content-center align-items-center">
        <MDBCol>
          <MDBCard className="my-4">
            <MDBRow className="g-0">
              <div className="card-header">
                <h1>Sign In</h1>
              </div>
            </MDBRow>
            <MDBRow className="g-0">
              <MDBCol md="6" className="d-none d-md-block">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                  alt="Sample photo"
                  className="rounded-start"
                  width="100%"
                  height="850px"
                  
                />
              </MDBCol>

              <MDBCol md="6">
                <div className="card-body">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="row mb-3">
                      <label className="col-sm-4 col-form-label fw-bold ">
                        Username
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          name="username"
                          value={formik.values.username}
                          onChange={formik.handleChange}
                          placeholder="Username"
                          className="form-control"
                        />
                        <div>
                          {formik.errors.username &&
                            formik.touched.username && (
                              <p className="erro">{formik.errors.username}</p>
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-4 col-form-label fw-bold ">
                        Email
                      </label>
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
                        I-Phone
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="number"
                          name="phone"
                          value={formik.values.phone}
                          placeholder="i-phone"
                          onChange={formik.handleChange}
                          className="form-control"
                        />
                        <div>
                          {formik.errors.phone && formik.touched.phone && (
                            <p className="erro">{formik.errors.phone}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-4 col-form-label fw-bold ">
                        Address
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          name="address"
                          value={formik.values.address}
                          placeholder="Address"
                          onChange={formik.handleChange}
                          className="form-control"
                        />
                        <div>
                          {formik.errors.address && formik.touched.address && (
                            <p className="erro">{formik.errors.address}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-4 col-form-label fw-bold">
                        Password
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="password"
                          name="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          className="form-control"
                          placeholder="Password"
                          id="inputPassword3"
                        />
                        <div>
                          {formik.errors.password &&
                            formik.touched.password && (
                              <p className="erro">{formik.errors.password}</p>
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-4 col-form-label fw-bold">
                        Confirm Password
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formik.values.confirmPassword}
                          onChange={formik.handleChange}
                          placeholder="ConfirmPassword"
                          className="form-control"
                          id="inputPassword3"
                        />
                        <div>
                          {formik.errors.confirmPassword &&
                            formik.touched.confirmPassword && (
                              <p className="erro">
                                {formik.errors.confirmPassword}
                              </p>
                            )}
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-outline-dark w-25 "
                    >
                      Sign in
                      
                    </button>
                    <div className="text-center text-md-start mt-4 pt-2">
                      <p className="small fw-bold mt-2 pt-1 mb-2 fs-3">
                        Have already an account?{" "}
                        <NavLink to="/login">Login</NavLink>
                      </p>
                    </div>
                  </form>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Register;

