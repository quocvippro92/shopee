import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import {
  createProductAdmin,
  getProductAdmin,
} from "../action/actionProductAdmin";

const slideProductAdmin = {
  listProduct: [],
  loadingCreateproductAdmin: false,
  pagination: {
    page: 1,
    limit: 5,
    total: 0,
    category: "",
  },
  search: "",
};

const todoSliceProductAdmin = createSlice({
  name: "Admin",
  initialState: slideProductAdmin,
  reducers: {
    filterCategory: (state, action) => {
      state.pagination.category = action.payload;
    },
    changePagination: (state, action) => {
      console.log(action.payload);
      state.pagination.page = action.payload.page;
      state.pagination.limit = action.payload.limit;
    },
    changeSearch: (state, action) => {
      console.log(action.payload);
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createProductAdmin.pending, (state, action) => {
      state.loadingCreateproductAdmin = true;
    });
    //fulfilled là thành công
    builder.addCase(createProductAdmin.fulfilled, (state, action) => {
      state.loadingCreateproductAdmin = false;
      state.listProduct = action.payload;
      notification.success({
        message: "Đăng ký thành công!",
        description: "Đăng nhập ngay bây giờ",
        style: { border: "2px solid #71be34" },
        duration: 3,
      });
    });
    builder.addCase(createProductAdmin.rejected, (state, action) => {
      state.loadingCreateproductAdmin = false;
      notification.error({
        message: "Đặt hàng thất bại!",
        description: "Đăng nhập ngay bây giờ",
        style: { border: "2px solid #71be34" },
        duration: 3,
      });
    });

    builder.addCase(getProductAdmin.pending, (state, action) => {
      state.loadingCreateproductAdmin = true;
    });
    //fulfilled là thành công
    builder.addCase(getProductAdmin.fulfilled, (state, action) => {
      state.loadingCreateproductAdmin = false;
      state.listProduct = action.payload;
    });
    builder.addCase(getProductAdmin.rejected, (state, action) => {
      state.loadingCreateproductAdmin = false;
    });
  },
});
export const { filterCategory, changePagination, changeSearch } =
  todoSliceProductAdmin.actions;
export const authReducerListProductAdmin = todoSliceProductAdmin.reducer;