import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
const Register = () => {
  const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  const formik = useFormik({
    initialValues: {
      username: "",
      address:"",
      phone:"",
      password: "",
      confirmPassword: "",
      email: "",
    },
    validationSchema: yup.object().shape({
      username: yup.string().min(5,"your name must be at least 5 characters!")
      .max(30,"your name must be under 30 characters")
      .required("you have not entered name"),
      email:yup.string().email("Invalid Email").required('your must fill in this section!'),
      phone:yup.string().matches(phoneRegExp, 'Phone number is not valid').required('required to enter number'),
      address:yup.string().required("your must fill in this section!"),
      password:yup.string().min(8,'Your name must be at least 8 characters!').required("your must fill inn this section!"),
      confirmPassword:yup.string().oneOf([yup.ref("password")],"password does not match!").required("your must fill in this section!")
    }),
    onSubmit:(values)=>{
      console.log(values);
    }
  });
  return (
    <div className="card text-center container p-0 mt-5">
      <div className="card-header">
        <h1>Sign In</h1>
      </div>
      <div className="card-body">
        <form onSubmit={formik.handleSubmit}>
          <div className="row mb-3">
            <label className="col-sm-4 col-form-label fw-bold ">Username</label>
            <div className="col-sm-8">
              <input
                type="text"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                placeholder="Username"
                className="form-control"
              />
              <div >{formik.errors.username && formik.touched.username && (<p className="erro">{formik.errors.username}</p>)}</div>
            </div>
            
          </div>
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
            <div >{formik.errors.email && formik.touched.email && (<p className="erro">{formik.errors.email}</p>)}</div>
            </div>

          </div>
          <div className="row mb-3">
            <label className="col-sm-4 col-form-label fw-bold ">I-Phone</label>
            <div className="col-sm-8">
              <input
                type="number"
                name="phone"
                value={formik.values.phone}
                placeholder="i-phone"
                onChange={formik.handleChange}
                className="form-control"
              />
            <div >{formik.errors.phone && formik.touched.phone && (<p className="erro">{formik.errors.phone}</p>)}</div>
            </div>
            </div>
          <div className="row mb-3">
            <label className="col-sm-4 col-form-label fw-bold ">Address</label>
            <div className="col-sm-8">
              <input
                type="text"
                name="address"
                value={formik.values.address}
                placeholder="Address"
                onChange={formik.handleChange}
                className="form-control"
              />
            <div >{formik.errors.address && formik.touched.address && (<p className="erro">{formik.errors.address}</p>)}</div>
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-4 col-form-label fw-bold">Password</label>
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
            <div >{formik.errors.password && formik.touched.password && (<p className="erro">{formik.errors.password}</p>)}</div>
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
            <div >{formik.errors.confirmPassword && formik.touched.confirmPassword && (<p className="erro">{formik.errors.confirmPassword}</p>)}</div>
            </div>

          </div>
          <button type="submit" className="btn btn-outline-dark w-25 ">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
