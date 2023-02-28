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
import { useDispatch, useSelector } from "react-redux";
import { profileAddress } from "../../redux/action/profileAddressAction";
import { NavLink } from "react-router-dom";

const Address = () => {
  const userId = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();
  const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  const formik = useFormik({
    initialValues: {
      userId: `${userId !== null ? userId.id : ""}`,
      name: "",
      phone: "",
      address_line: "",
      province_city: "",
      district: "",
      sub_district: "",
    },
    validationSchema: yup.object().shape({
      userId: yup.number().required("required to enter number"),
      name: yup
        .string()
        .min(5, "your name must be at least 5 characters!")
        .max(30, "your name must be under 30 characters")
        .required("you have not entered name"),
      phone: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("required to enter number"),
      address_line: yup.string().required("your must fill in this section!"),
      province_city: yup.string().required("your must fill inn this section!"),
      district: yup.string().required("your must fill in this section!"),
      sub_district: yup.string().required("your must fill in this section!"),
    }),
    onSubmit: (values) => {
      dispatch(profileAddress(values));
      console.log(values);
    },
  });
  return (
    <MDBContainer>
      <MDBRow className="d-flex justify-content-center align-items-center">
        <MDBCol>
          <MDBCard className="my-4">
            <MDBRow className="g-0">
              <div className="card-header">
                <h1>Sổ Thông Tin</h1>
              </div>
            </MDBRow>
            <MDBRow className="g-0">
              <MDBCol md="6" className="d-none d-md-block">
                <MDBCardImage
                  src="https://inuvcuon.vn/images/2018/08/voi-nhung-cong-cu-rat-huu-ich-ban-da-co-the-in-truc-tiep-ngay-tren-google-map.jpg"
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
                        UserId
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          name="userId"
                          value={formik.values.userId}
                          onChange={formik.handleChange}
                          placeholder="UserId"
                          className="form-control"
                        />
                        <div>
                          {formik.errors.userId && formik.touched.userId && (
                            <p className="erro">{formik.errors.userId}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-4 col-form-label fw-bold ">
                        Name
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          name="name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          className="form-control"
                          placeholder="Name..."
                        />
                        <div>
                          {formik.errors.name && formik.touched.name && (
                            <p className="erro">{formik.errors.name}</p>
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
                        Address_line
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          name="address_line"
                          value={formik.values.address_line}
                          placeholder="Address"
                          onChange={formik.handleChange}
                          className="form-control"
                        />
                        <div>
                          {formik.errors.address_line &&
                            formik.touched.address_line && (
                              <p className="erro">
                                {formik.errors.address_line}
                              </p>
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-4 col-form-label fw-bold ">
                        province_city
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          name="province_city"
                          value={formik.values.province_city}
                          placeholder="province_city"
                          onChange={formik.handleChange}
                          className="form-control"
                        />
                        <div>
                          {formik.errors.province_city &&
                            formik.touched.province_city && (
                              <p className="erro">
                                {formik.errors.province_city}
                              </p>
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-4 col-form-label fw-bold ">
                        District
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          name="district"
                          value={formik.values.district}
                          placeholder="district"
                          onChange={formik.handleChange}
                          className="form-control"
                        />
                        <div>
                          {formik.errors.district &&
                            formik.touched.district && (
                              <p className="erro">{formik.errors.district}</p>
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-4 col-form-label fw-bold ">
                        sub_district
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          name="sub_district"
                          value={formik.values.sub_district}
                          placeholder="sub_district"
                          onChange={formik.handleChange}
                          className="form-control"
                        />
                        <div>
                          {formik.errors.sub_district &&
                            formik.touched.sub_district && (
                              <p className="erro">
                                {formik.errors.sub_district}
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
                    <NavLink to={'/'} >
                      <button
                        type="submit"
                        className="btn btn-outline-dark w-25 "
                        style={{marginLeft: '20px'}}
                      >
                        Trang Chủ
                      </button>
                    </NavLink>
                  </form>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Address;
