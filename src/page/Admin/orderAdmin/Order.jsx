import { Pagination, Rate, Upload } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrderAdmin,
  getOrderAdmin,
  updateOrderAdmin,
  updateProductAdmin,
} from "../../../redux/action/actionProductAdmin";
import { changePagination } from "../../../redux/slice/sliceProductAdmin";
import "./order.scss";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const Order = () => {
  const [onClick, setOnClick] = useState(false);
  const [onClickEdit, setOnClickEdit] = useState(false);
  const [information, setInformation] = useState([]);
  const [valueRate, setValueRate] = useState(1);
  const [fileList, setFileList] = useState([]);
  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [confirmLoadingCreate, setConfirmLoadingCreate] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("bạn có chắc muốn xóa sản phẩm ?");
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
      getOrderAdmin({
        page: `${pagination.page}`,
        limit: `${pagination.limit}`,
        category: `${pagination.category}`,
        textSearch: search,
      })
    );
  }, [pagination, search]);

  // const handleDelete = (id) => {
  //   dispatch(deleteProductAdmin(id));
  //   dispatch(
  //     getProductAdmin({
  //       page: `${pagination.page}`,
  //       limit: `${pagination.limit}`,
  //       category: `${pagination.category}`,
  //       textSearch: search,
  //     })
  //   );
  // };
  const handleClick = (product) => {
    setInformation(product);
    console.log(product);
    setOnClick(!onClick);
  };

  const hanldeEdit = (product) => {
    setInformation(product);
    setOnClickEdit(!onClickEdit);
  };
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = (id) => {
    setModalText("chời đợi trong giây lát");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      dispatch(deleteOrderAdmin(id));
      dispatch(
        getOrderAdmin({
          page: `${pagination.page}`,
          limit: `${pagination.limit}`,
          category: `${pagination.category}`,
          textSearch: search,
        })
      );
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const showModalCreate = () => {
    setOpenCreate(true);
  };
  const handleOkCreate = (id) => {
    setModalText("chời đợi trong giây lát");
    setConfirmLoadingCreate(true);
    setTimeout(() => {
      setOpenCreate(false);
      setConfirmLoadingCreate(false);
    }, 1000);
  };
  const handleCancelCreate = () => {
    console.log("Clicked cancel button");
    setOpenCreate(false);
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
        .max(30, "your name must be under 30 characters")
        .required("you have not entered firstname"),

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
      objValue.name = values.firstname;
      objValue.phone = values.phone;
      objValue.address = values.address;
      objValue.district = values.district;
      objValue.city = values.city;
      objValue.ward = values.ward;
      dispatch(updateOrderAdmin({ id, objValue }));
      dispatch(
        getOrderAdmin({
          page: `${pagination.page}`,
          limit: `${pagination.limit}`,
          category: `${pagination.category}`,
          textSearch: search,
        })
      );
      setOnClickEdit(!onClickEdit);
    },
  });

  const formikCreate = useFormik({
    initialValues: {
      category: "",
      description: "",
      image: "",
      price: "",
      rating: "1",
      size: "",
      mau: "",
      quantity: "",
      title: "",
    },
    validationSchema: yup.object().shape({
      category: yup.string().required("you have not entered category"),
      description: yup.string().required("your must fill in this description!"),
      image: yup
        .mixed()
        .required("required!")
        .test(
          "File_size",
          "Too big!",
          (value) => value && value.size < 1024 * 1024
        )
        .test(
          "File_Type",
          "Invalid!",
          (value) => value && ["image/png", "image/jpeg"].includes(value.type)
        ),
      price: yup.string().required("your must fill in this section!"),
      // rating: yup.string().required("your must fill inn this section!"),
      size: yup.string().required("your must fill in this section!"),
      mau: yup.string().required("your must fill in this section!"),
      quantity: yup.string().required("your must fill in this section!"),
      title: yup.string().required("your must fill in this section!"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const validateFileType = ({ type, name }, allowedTypes) => {
    if (!allowedTypes) {
      return true;
    }

    if (type) {
      return allowedTypes.includes(type);
    }
  };
  const uploadProps = useMemo(
    () => ({
      beforeUpload: (file) => {
        const isAllowedType = validateFileType(file, "image/png");
        if (!isAllowedType) {
          setFileList((state) => [...state]);
          // message.error(`${file.name} is not PNG file`);

          console.log(
            "🚀 ~ file: Order.jsx:192 ~ Order ~ file.name:",
            file.name
          );
          return false;
        }
        setFileList((state) => [...state, file]);
        return false;
      },
    }),
    []
  );
  return (
    <>
      <div className="container-fuild">
        <div className="headerNavbar">
          <h1>Danh Sách Khách Hàng Đã Order</h1>
        </div>
      </div>
      <Button type="primary" className="btn-gold" onClick={showModalCreate}>
        CreateProduct
      </Button>

      <Modal
        title="Title"
        open={openCreate}
        confirmLoading={confirmLoadingCreate}
        onCancel={handleCancelCreate}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <form onSubmit={formikCreate.handleSubmit}>
          <div className="row mb-3">
            <label className="col-sm-4 col-form-label fw-bold ">category</label>
            <div className="col-sm-8">
              <input
                type="text"
                name="category"
                value={formikCreate.values.category}
                onChange={formikCreate.handleChange}
                placeholder="category"
                className="form-control"
              />
              <div>
                {formikCreate.errors.category &&
                  formikCreate.touched.category && (
                    <p className="erro">{formikCreate.errors.category}</p>
                  )}
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-4 col-form-label fw-bold ">
              description
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                name="description"
                value={formikCreate.values.description}
                onChange={formikCreate.handleChange}
                className="form-control"
                placeholder="description"
                id="inputEmail3"
              />
              <div>
                {formikCreate.errors.description &&
                  formikCreate.touched.description && (
                    <p className="erro">{formikCreate.errors.description}</p>
                  )}
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-4 col-form-label fw-bold ">Image</label>
            <div className="col-sm-8">
              {/* <input
                type="number"
                name="image"
                value={formikCreate.values.image}
                placeholder="image"
                onChange={formikCreate.handleChange}
                className="form-control"
              /> */}
              <Upload multiple {...uploadProps} fileList={fileList}>
                <Button
                  icon={<UploadOutlined />}
                  name="image"
                  value={formikCreate.values.image}
                  placeholder="image"
                  onChange={formikCreate.handleChange}
                >
                  Upload png only
                </Button>
              </Upload>
              <div>
                {formikCreate.errors.image && formikCreate.touched.image && (
                  <p className="erro">{formikCreate.errors.image}</p>
                )}
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-4 col-form-label fw-bold ">price</label>
            <div className="col-sm-8">
              <input
                type="text"
                name="price"
                value={formikCreate.values.price}
                placeholder="Address"
                onChange={formikCreate.handleChange}
                className="form-control"
              />
              <div>
                {formikCreate.errors.price && formikCreate.touched.price && (
                  <p className="erro">{formikCreate.errors.price}</p>
                )}
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-4 col-form-label fw-bold">rating</label>
            <div className="col-sm-8">
              <span>
                <Rate
                  name="rating"
                  onChange={setValueRate}
                  value={valueRate}
                  allowHalf
                />
              </span>
              <div>
                {formikCreate.errors.rating && formikCreate.touched.rating && (
                  <p className="erro">{formikCreate.errors.rating}</p>
                )}
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-4 col-form-label fw-bold">size</label>
            <div className="col-sm-8">
              <select
                name="size"
                value={formikCreate.values.size}
                onChange={formikCreate.handleChange}
                className="form-control"
                id="inputPassword3"
              >
                <option value="">Size</option>
                <option value="X">X</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XS">XS</option>
              </select>

              <div>
                {formikCreate.errors.size && formikCreate.touched.size && (
                  <p className="erro">{formikCreate.errors.size}</p>
                )}
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-4 col-form-label fw-bold">mau</label>
            <div className="col-sm-8">
              <input
                type="text"
                name="mau"
                value={formikCreate.values.mau}
                onChange={formikCreate.handleChange}
                placeholder="mau"
                className="form-control"
                id="inputPassword3"
              />
              <div>
                {formikCreate.errors.mau && formikCreate.touched.mau && (
                  <p className="erro">{formikCreate.errors.mau}</p>
                )}
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-4 col-form-label fw-bold">quantity</label>
            <div className="col-sm-8">
              <input
                type="text"
                name="quantity"
                value={formikCreate.values.quantity}
                onChange={formikCreate.handleChange}
                placeholder="quantity"
                className="form-control"
                id="inputPassword3"
              />
              <div>
                {formikCreate.errors.quantity &&
                  formikCreate.touched.quantity && (
                    <p className="erro">{formikCreate.errors.quantity}</p>
                  )}
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-4 col-form-label fw-bold">title</label>
            <div className="col-sm-8">
              <input
                type="text"
                name="title"
                value={formikCreate.values.title}
                onChange={formikCreate.handleChange}
                placeholder="title"
                className="form-control"
                id="inputPassword3"
              />
              <div>
                {formikCreate.errors.title && formikCreate.touched.title && (
                  <p className="erro">{formikCreate.errors.title}</p>
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-outline-dark w-25 btn-submit"
          >
            Create
          </button>
          <button type="submit" className="btn btn-outline-dark w-25 ">
            Cancel
          </button>
        </form>
      </Modal>
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
          {listProduct?.map((product, index) => (
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
                {product?.product?.map((sp, index) => (
                  <img src={sp.image} height={50} width={50} key={index}></img>
                ))}
              </td>
              <td>
                {product?.product?.map((sp, index) => (
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
                            <img src="" alt="" />
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
                  <Button type="primary" onClick={showModal}>
                    Delete
                  </Button>
                  <Modal
                    title="Alert"
                    open={open}
                    onOk={() => handleOk(product.id)}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                  >
                    <p>{modalText}</p>
                  </Modal>

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
                              <button
                                type="submit"
                                className="btn btn-outline-dark btnSend ms-3"
                                onClick={() => setOnClickEdit(!onClickEdit)}
                              >
                                cancel
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
        total={Number(pagination.total)}
        pageSize={Number(pagination.limit)}
      />
    </>
  );
};

export default Order;
