import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductAdmin } from "../../../redux/action/actionProductAdmin";

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
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("bạn có chắc muốn xóa sản phẩm ?");
  const [openEdit, setOpenEdit] = useState(false);
  const [confirmLoadingEdit, setConfirmLoadingEdit] = useState(false);
  const [modalTextEdit, setModalTextEdit] = useState(
    "bạn có chắc Edit sản phẩm?"
  );

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

  const handleClick = (product) => {
    setInformation(product);
    console.log(product);
    setOnClick(!onClick);
  };

  const hanldeEdit = (product) => {
    setInformation(product);
    setOnClickEdit(!onClickEdit);
  };

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
    setOpen(true);
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

  return (
    <>
      <div className="container-fuild">
        <div className="headerNavbar">
          <h1>Sản Phẩm Hiện Có Của QH_SHOP</h1>
        </div>
      </div>

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
