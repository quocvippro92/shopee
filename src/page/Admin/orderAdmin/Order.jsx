import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductAdmin,
  getProductAdmin,
  updateProductAdmin,
} from "../../../redux/action/actionProductAdmin";
import { changePagination } from "../../../redux/slice/sliceProductAdmin";
import "./order.scss";
import * as yup from "yup";
import { useFormik } from "formik";

const Order = () => {
  const [onClick, setOnClick] = useState(false);
  const [onClickEdit, setOnClickEdit] = useState(false);
  const [information, setInformation] = useState([]);
  const dispatch = useDispatch();
  const listProduct = useSelector(
    (state) => state.authReducerListProductAdmin.listProduct
  );
  const search = useSelector(
    (state) => state.authReducerListProductAdmin.search
  );

  const pagination = useSelector(
    (state) => state.authReducerListProductAdmin.pagination
  );
  useEffect(() => {
    dispatch(
      getProductAdmin({
        page: `${pagination.page}`,
        limit: `${pagination.limit}`,
        category: `${pagination.category}`,
        textSearch: search,
      })
    );
  }, [pagination, search]);

  const handleDelete = (id) => {
    dispatch(deleteProductAdmin(id));
    dispatch(
      getProductAdmin({
        page: `${pagination.page}`,
        limit: `${pagination.limit}`,
        category: `${pagination.category}`,
        textSearch: search,
      })
    );
  };
  const handleClick = (product) => {
    setInformation(product);
    console.log(product);
    setOnClick(!onClick);
  };

  const hanldeEdit = (product) => {
    setInformation(product);
    setOnClickEdit(!onClickEdit);
  };

  const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

  const formik = useFormik({
    initialValues: {
      firstname: "",
      address: "",
      city: "",
      phone: "",
      ward: "",
      district: "",
    },
    validationSchema: yup.object().shape({
      firstname: yup
        .string()
        .min(5, "your name must be at least 5 characters!")
        .max(30, "your name must be under 30 characters"),

      address: yup.string(),
      city: yup.string(),
      ward: yup.string(),
      district: yup.string(),
      phone: yup.string().matches(phoneRegExp, "Phone number is not valid"),
      textarea: yup.string(),
    }),
    onSubmit: (values) => {
      const id = information.id;
      const objValue = { ...values };
      console.log(objValue);
      objValue.name = values.firstname;
      objValue.phone = values.phone;
      objValue.address = values.address;
      objValue.district = values.district;
      objValue.city = values.city;
      objValue.ward = values.ward;
      dispatch(updateProductAdmin({ id, objValue }));
    },
  });

  return (
    <>
      <div className="container-fuild">
        <div className="headerNavbar">
          <h1>Danh Sách Khách Hàng Đã Order</h1>
        </div>
      </div>

      <Table striped>
        <thead>
          <tr>
            <th>STT</th>
            <th> Name</th>
            <th> Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Textarea</th>
            <th>Product</th>
            <th>Color</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listProduct.map((product, index) => (
            <tr key={index}>
              <td>{index + 1}</td>

              <td>{product.name}</td>
              <td>{product.email}</td>
              <td>
                {product.ward}/{product.district}/{product.city}
              </td>
              <td>{product.phone}</td>
              <td>{product.textarea}</td>
              <td>
                {product.product.map((sp, index) => (
                  <img src={sp.image} height={50} width={50} key={index}></img>
                ))}
              </td>
              <td>
                {product.product.map((sp, index) => (
                  <div key={index}>{sp.color + "/"}</div>
                ))}
              </td>
              <td>
                <div className="action">
                  <button
                    className=" btn btn-outline-dark btn-primary px-4 py-2 me-2 a"
                    onClick={() => {
                      handleClick(product);
                    }}
                  >
                    Xem chi tiết
                  </button>

                  <div
                    className={onClick ? "detail open" : "detail"}
                    onClick={() => setOnClick(!onClick)}
                  >
                    <div className="detail_form">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="detail_form_img">
                            <img
                              src="https://vapa.vn/wp-content/uploads/2022/12/avatar-facebook-dep-003.jpg"
                              alt=""
                            />
                          </div>
                          <div className="detail_name">{information.name}</div>
                          <div className="detail_page">
                            <i
                              className="fa fa-facebook-official detail_page-icone"
                              aria-hidden="true"
                            ></i>
                            <a href="https://www.facebook.com/huynhngocvuongquoc/">
                              https://www.facebook.com/huynhngocvuongquoc/
                            </a>
                          </div>
                          <div className="detail_page">
                            <i
                              className="fa fa-instagram detail_page-icone"
                              aria-hidden="true"
                            ></i>
                            <a href="https://www.instagram.com/quoceric99/">
                              https://www.instagram.com/quoceric99/
                            </a>
                          </div>
                          <div className="detail_page">
                            <i
                              className="fa fa-telegram detail_page-icone"
                              aria-hidden="true"
                            ></i>
                            <a href="https://www.instagram.com/quoceric99/">
                              https://www.instagram.com/quoceric99/
                            </a>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <form>
                            <div className="delivery-address">
                              <div className="header-right">
                                <h4>Thông Tin Thành Viên</h4>
                              </div>
                              <div>
                                <div className="name">
                                  <div className="name-left">
                                    <input
                                      className="ten form"
                                      name="firstname"
                                      type="text"
                                      placeholder="Họ và tên"
                                      defaultValue={information.name}
                                    />
                                    <div></div>
                                  </div>
                                </div>
                                <div>
                                  <input
                                    className="phone form"
                                    name="phone"
                                    type="number"
                                    defaultValue={information.phone}
                                  />
                                  <div></div>
                                </div>
                                <div>
                                  <input
                                    className="address form"
                                    name="address"
                                    type="text"
                                    defaultValue={information.address}
                                  />
                                </div>
                                <div>
                                  <input
                                    className="address form"
                                    name="address"
                                    type="text"
                                    defaultValue={information.address}
                                  />
                                </div>
                                <div>
                                  <input
                                    className="address form"
                                    name="address"
                                    type="text"
                                    defaultValue={information.ward}
                                  />
                                </div>
                                <div>
                                  <input
                                    className="address form"
                                    name="address"
                                    type="text"
                                    defaultValue={information.district}
                                  />
                                </div>
                                <div>
                                  <input
                                    className="address form"
                                    name="address"
                                    type="text"
                                    defaultValue={information.city}
                                  />
                                </div>

                                <textarea
                                  name="textarea"
                                  id="note"
                                  className="field__input"
                                  data-bind="note"
                                ></textarea>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="form_edit"></div>
                  </div>
                  <button
                    className=" btn btn-outline-dark btn-danger px-4 py-2 me-2 a"
                    onClick={() => handleDelete(product.id)}
                  >
                    DELETE
                  </button>
                  <button
                    className=" btn btn-outline-dark btn-success px-4 py-2 me-2 a"
                    onClick={() => hanldeEdit(product)}
                  >
                    EDIT
                  </button>
                  <div
                    className={onClickEdit ? "detail_edit open" : "detail_edit"}
                  >
                    <div className="detail_formEdit">
                      <div className="row">
                        <div className="col-md-12">
                          <form onSubmit={formik.handleSubmit}>
                            <div className="Contact-Info">
                              <div className="row">
                                <div className="col-md-12 col-ms-12">
                                  <h4>Thông Tin Liên Hệ</h4>
                                </div>
                              </div>
                              <div>
                                <div className="row">
                                  <div className="col-md-2 col-ms-12">
                                    <label htmlFor="">
                                      <strong>Email</strong>
                                    </label>
                                  </div>
                                  <div className="col-md-10 col-ms-12">
                                    <input
                                      className="input-form"
                                      type="email"
                                      id="email"
                                      name="email"
                                      defaultValue={information.email}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="delivery-address">
                              <div>
                                <div className="name row">
                                  <div className="col-md-2 col-ms-12">
                                    {" "}
                                    <label htmlFor="">
                                      <strong>Name</strong>
                                    </label>
                                  </div>
                                  <div className="name-left col-md-10 col-ms-12">
                                    <input
                                      className="ten"
                                      name="firstname"
                                      defaultValue={information.name}
                                      onChange={formik.handleChange}
                                      type="text"
                                      placeholder="Họ và tên"
                                    />
                                    <div>
                                      {formik.errors.firstname &&
                                        formik.touched.firstname && (
                                          <p className="erro">
                                            {formik.errors.firstname}
                                          </p>
                                        )}
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-2 col-ms-12">
                                    <label htmlFor="">
                                      <strong>Phone</strong>
                                    </label>
                                  </div>
                                  <div className="col-md-10 col-ms-12">
                                    <input
                                      className="phone"
                                      name="phone"
                                      defaultValue={information.phone}
                                      onChange={formik.handleChange}
                                      type="number"
                                      placeholder="sdt liên hệ"
                                    />
                                    <div>
                                      {formik.errors.phone &&
                                        formik.touched.phone && (
                                          <p className="erro">
                                            {formik.errors.phone}
                                          </p>
                                        )}
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-2 col-ms-12">
                                    <label htmlFor="">
                                      <strong>Address</strong>
                                    </label>
                                  </div>
                                  <div className="col-md-10 col-ms-12">
                                    <input
                                      defaultValue={information.address}
                                      onChange={formik.handleChange}
                                      className="address"
                                      name="address"
                                      type="text"
                                      placeholder="địa chỉ Số nhà"
                                    />
                                    <div>
                                      {formik.errors.address &&
                                        formik.touched.address && (
                                          <p className="erro">
                                            {formik.errors.address}
                                          </p>
                                        )}
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-2 col-ms-12">
                                    <label htmlFor="">
                                      <strong>District</strong>
                                    </label>
                                  </div>
                                  <div className="col-md-10 col-ms-12">
                                    <input
                                      defaultValue={information.district}
                                      onChange={formik.handleChange}
                                      className="address"
                                      name="district"
                                      type="text"
                                      placeholder="địa chỉ Số nhà"
                                    />
                                    <div>
                                      {formik.errors.district &&
                                        formik.touched.district && (
                                          <p className="erro">
                                            {formik.errors.district}
                                          </p>
                                        )}
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-2 col-ms-12">
                                    <label htmlFor="">
                                      <strong>Ward</strong>
                                    </label>
                                  </div>
                                  <div className="col-md-10 col-ms-12">
                                    <input
                                      defaultValue={information.ward}
                                      onChange={formik.handleChange}
                                      className="address"
                                      name="ward"
                                      type="text"
                                      placeholder="địa chỉ Số nhà"
                                    />
                                    <div>
                                      {formik.errors.ward &&
                                        formik.touched.ward && (
                                          <p className="erro">
                                            {formik.errors.ward}
                                          </p>
                                        )}
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-2 col-ms-12">
                                    <label htmlFor="">
                                      <strong>City</strong>
                                    </label>
                                  </div>
                                  <div className="col-md-10 col-ms-12">
                                    <input
                                      defaultValue={information.city}
                                      onChange={formik.handleChange}
                                      className="address"
                                      name="city"
                                      type="text"
                                      placeholder="địa chỉ Số nhà"
                                    />
                                    <div>
                                      {formik.errors.city &&
                                        formik.touched.city && (
                                          <p className="erro">
                                            {formik.errors.city}
                                          </p>
                                        )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="send">
                              <button
                                type="submit"
                                className="btn btn-outline-dark btnSend"
                              >
                                Edit
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="form_edit"></div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        onChange={(page, pageSize) => {
          dispatch(changePagination({ page: page, limit: pageSize }));
        }}
        current={Number(pagination.page)}
        total={Number(50)}
        pageSize={Number(pagination.limit)}
      />
    </>
  );
};

export default Order;
