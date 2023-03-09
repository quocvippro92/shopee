import { Pagination } from "antd";
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

  const handleDelete = (cart) => {
    dispatch(deleteUser(cart));
    dispatch(
      getLoginAdmin({
        page: `${pagination.page}`,
        limit: `${pagination.limit}`,
        category: `${pagination.category}`,
        textSearch: search,
      })
    );
  };
  return (
    <>
      <div className="container-fuild">
        <div className="headerNavbar">
          <h1>Danh Sách Khách Hàng Đã Order</h1>
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
          {listUsers.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.phone}</td>
              <td>
                <button
                  className=" btn btn-outline-dark btn-danger px-4 py-2 me-2 a"
                  onClick={() => handleDelete(user.id)}
                >
                  DELETE
                </button>
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

export default UsersAdmin;
