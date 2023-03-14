import { Button, Modal, Pagination } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Table } from "react-bootstrap";
import {
  deleteUser,
  getLoginAdmin,
} from "../../../redux/action/actionLoginRegister";
import { changePagination } from "../../../redux/slice/sliceLoginRegister";

const UsersAdmin = () => {
  const dispatch = useDispatch();
  const pagination = useSelector((state) => state.authReducer.pagination);
  const search = useSelector((state) => state.authReducer.search);
  const listUsers = useSelector((state) => state.authReducer.listUsers);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("bạn có chắc muốn xóa sản phẩm ?");
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);
  useEffect(() => {
    dispatch(
      getLoginAdmin({
        page: `${pagination.page}`,
        limit: `${pagination.limit}`,
        category: `${pagination.category}`,
        textSearch: search,
      })
    );
  }, [pagination, search]);
  const showModal = (id) => {
    setId(id);
    setOpen(true);
  };
  const handleOk = () => {
    setModalText("chời đợi trong giây lát");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      dispatch(deleteUser(id));
      dispatch(
        getLoginAdmin({
          page: `${pagination.page}`,
          limit: `${pagination.limit}`,
          category: `${pagination.category}`,
          textSearch: search,
        })
      );
    }, 2000);
  };
  const handleCancel = (id) => {
    setOpen(false);
  };

  return (
    <>
      <div className="container-fuild">
        <div className="headerNavbar">
          <h1>Danh Sách Khách Hàng</h1>
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers?.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.phone}</td>
              <td>
                <Button type="primary" onClick={() => showModal(user.id)}>
                  Delete
                </Button>
                <Modal
                  title="Alert"
                  open={open}
                  onOk={handleOk}
                  confirmLoading={confirmLoading}
                  onCancel={handleCancel}
                >
                  <p>{modalText}</p>
                </Modal>
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

export default UsersAdmin;
