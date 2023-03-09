import React from "react";
import "./loginAdmin.scss";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../../redux/action/actionLoginRegister";
const LoginAdmin = () => {
  const handleSubmit = (e) => {
    console.log(e);
  };
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
    <div className="backgrow-color_login">
      <MDBContainer className="my-5">
        <MDBCard>
          <MDBRow className="g-0">
            <MDBCol md="6">
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                alt="login form"
                className="rounded-start w-100"
              />
            </MDBCol>

            <MDBCol md="6">
              <MDBCardBody className="d-flex flex-column">
                <div className="d-flex flex-row mt-2">
                  <span className="h1 fw-bold mb-0">QH-SHOP</span>
                </div>

                <h5
                  className="fw-normal my-4 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  Sign into your account
                </h5>
                <form onSubmit={formik.handleSubmit}>
                  <div className="item-email">
                    <label className="col-form-label fw-bold  ">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      className="form-control "
                      placeholder="Email..."
                      id="inputEmail3"
                    />
                    {formik.errors.email && formik.touched.email && (
                      <p className="erro">{formik.errors.email}</p>
                    )}
                  </div>
                  <div className="item-email">
                    <label className=" col-form-label fw-bold  ">
                      password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      placeholder="password"
                      className="form-control"
                    />
                    {formik.errors.password && formik.touched.password && (
                      <p className="erro">{formik.errors.password}</p>
                    )}
                  </div>

                  <button type="submit" className="btn btn-outline-dark w-25 ">
                    Sign in
                  </button>
                </form>
                <a className="small text-muted" href="#!">
                  Forgot password?
                </a>
                <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                  Don't have an account?{" "}
                  <a href="#!" style={{ color: "#393f81" }}>
                    Register here
                  </a>
                </p>

                <div className="d-flex flex-row justify-content-start">
                  <a href="#!" className="small text-muted me-1">
                    Terms of use.
                  </a>
                  <a href="#!" className="small text-muted">
                    Privacy policy
                  </a>
                </div>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default LoginAdmin;
