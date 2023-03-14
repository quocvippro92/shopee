import { Pagination, Rate } from "antd";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductsAdmin,
  deleteProductAdmin,
} from "../../../redux/action/actionProductAdmin";

import * as yup from "yup";
import { useFormik } from "formik";
import { fetchProducts } from "../../../redux/action/productAction";
import { Button, Modal } from "antd";
import "./productAdmin.scss";
import { changePagination } from "../../../redux/slice/sliceProducts";

const ProductAdmin = () => {
  const [onClick, setOnClick] = useState(false);
  const [onClickEdit, setOnClickEdit] = useState(false);
  const [information, setInformation] = useState([]);
  const [valueRate, setValueRate] = useState(1);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("bạn có chắc muốn xóa sản phẩm ?");
  const [openEdit, setOpenEdit] = useState(false);
  const [confirmLoadingEdit, setConfirmLoadingEdit] = useState(false);
  const [modalTextEdit, setModalTextEdit] = useState(
    "bạn có chắc Edit sản phẩm?"
  );
  const [openCreate, setOpenCreate] = useState(false);
  const [confirmLoadingCreate, setConfirmLoadingCreate] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.authReducerProducts.products);
  const search = useSelector(
    (state) => state.authReducerListProductAdmin.search
  );

  const pagination = useSelector(
    (state) => state.authReducerProducts.pagination
  );
  useEffect(() => {
    dispatch(
      fetchProducts({
        page: `${pagination.page}`,
        limit: `${pagination.limit}`,
        category: `${pagination.category}`,
        textSearch: search,
      })
    );
  }, [pagination]);

  const showModalDelete = () => {
    setOpen(true);
  };
  const handleOkDelete = (id) => {
    console.log(id);
    setModalText("chời đợi trong giây lát");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      dispatch(deleteProductAdmin(id));
      dispatch(
        fetchProducts({
          page: `${pagination.page}`,
          limit: `${pagination.limit}`,
          category: `${pagination.category}`,
          textSearch: search,
        })
      );
    }, 2000);
  };
  const handleCancelDelete = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  // Edit
  const showModalEdit = () => {
    setOpenEdit(true);
  };

  const handleOkEdit = () => {
    setModalTextEdit("đợi trong giay lat");
    setConfirmLoadingEdit(true);
    setTimeout(() => {
      setOpenEdit(false);
      setConfirmLoadingEdit(false);
    }, 2000);
  };

  const handleCancelEdit = () => {
    console.log("Clicked cancel button");
    setOpenEdit(false);
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
      // dispatch(updateProductAdmin({ id, objValue }));
    },
  });
  const formikCreate = useFormik({
    initialValues: {
      category: "",
      description: "",
      image: "",
      price: "",
      rating: "",
      size: "",
      mau: "",
      count: "",
      title: "",
    },
    validationSchema: yup.object().shape({
      category: yup.string().required("you have not entered category"),
      description: yup.string().required("your must fill in this description!"),
      image: yup.string().required("required!"),
      price: yup.string().required("your must fill in this section!"),
      rating: yup.string(),
      size: yup.string().required("your must fill in this section!"),
      mau: yup.string().required("your must fill in this section!"),
      count: yup.string().required("your must fill in this section!"),
      title: yup.string().required("your must fill in this section!"),
    }),
    onSubmit: (values) => {
      const newProduct = {
        ...values,
        rating: { rate: valueRate, count: formikCreate.values.count },
      };

      dispatch(createProductsAdmin(newProduct));
      dispatch(
        fetchProducts({
          page: `${pagination.page}`,
          limit: `${pagination.limit}`,
          category: `${pagination.category}`,
          textSearch: search,
        })
      );
    },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModalCreate = () => {
    setOpenCreate(true);
  };
  // const handleOkCreate = (id) => {
  //   setModalText("chời đợi trong giây lát");
  //   setConfirmLoadingCreate(true);
  //   setTimeout(() => {
  //     setOpenCreate(false);
  //     setConfirmLoadingCreate(false);
  //   }, 1000);
  // };
  const handleCancelCreate = () => {
    console.log("Clicked cancel button");
    setOpenCreate(false);
  };
  return (
    <>
      <div className="container-fuild">
        <div className="headerNavbar">
          <h1>Sản Phẩm Hiện Có Của QH_SHOP</h1>
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
              <input
                type="text"
                name="image"
                value={formikCreate.values.image}
                onChange={formikCreate.handleChange}
                className="form-control"
                placeholder="link image"
                id="inputEmail3"
              />
              <div></div>

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
                placeholder="price"
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
            <label className="col-sm-4 col-form-label fw-bold">Count</label>
            <div className="col-sm-8">
              <input
                type="text"
                name="count"
                value={formikCreate.values.count}
                onChange={formikCreate.handleChange}
                placeholder="count"
                className="form-control"
                id="inputPassword3"
              />
              <div>
                {formikCreate.errors.count && formikCreate.touched.count && (
                  <p className="erro">{formikCreate.errors.count}</p>
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
        </form>
      </Modal>

      <Table striped>
        <thead>
          <tr>
            <th>STT</th>
            <th> Name</th>
            <th> Image</th>
            <th>Price</th>
            <th>Count</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product, index) => (
            <tr key={index}>
              <td>{index + 1}</td>

              <td>{product.description}</td>
              <td>
                <img src={product.image} height={100} width={100} />
              </td>
              <td>{product.price}$</td>
              <td>{product.rating.count + "bộ"} </td>
              <td>{product.title}$</td>
              <td>
                <div className="action-admin">
                  <Button
                    type="primary"
                    className="btn-xct"
                    onClick={showModal}
                  >
                    Xem Chi Tiết
                  </Button>
                  <Modal
                    title="Thông Tin Chi Tiết Sản Phẩm"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    <p>
                      <strong>category</strong> : {product.category}
                    </p>
                    <p>
                      <strong>description</strong>: {product.description}
                    </p>
                    <p>
                      <strong>image</strong> :
                      <img
                        src={product.image}
                        alt={product.title}
                        height={100}
                        width={100}
                      />
                    </p>
                    <p>
                      <strong>count</strong>: {product.rating.count} Bộ
                    </p>
                    <p>
                      <strong>Size</strong>: L/X/XL/XS
                    </p>
                    <p>
                      <strong>title</strong>: {product.title}
                    </p>
                  </Modal>
                </div>
                <div className="action-admin">
                  <Button type="primary" onClick={showModalDelete}>
                    Delete
                  </Button>
                  <Modal
                    title="Alert"
                    open={open}
                    onOk={() => handleOkDelete(product.id)}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancelDelete}
                  >
                    <p>{modalTextEdit}</p>
                  </Modal>
                </div>

                <div className="action-admin">
                  <Button
                    type="primary"
                    className="btn-edit"
                    onClick={showModalEdit}
                  >
                    Edit
                  </Button>
                  <Modal
                    title="Title"
                    open={openEdit}
                    onOk={handleOkEdit}
                    confirmLoading={confirmLoadingEdit}
                    onCancel={handleCancelEdit}
                  >
                    <p>{modalText}</p>
                  </Modal>
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

export default ProductAdmin;
