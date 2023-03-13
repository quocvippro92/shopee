import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import LocalStorge from "../../localstroge/Localstroge";
import {
  fetchRegister,
  getLoginAdmin,
  login,
} from "../action/actionLoginRegister";

//tạo redux thuk để lấy data về

const { get, set } = LocalStorge("user", null);
const authInitalState = {
  user: get(),
  loadingRegister: false,
  loadingLogin: false,
  loadingLoginAdmin: false,
  pagination: {
    page: 1,
    limit: 8,
    total: 0,
    category: "",
  },
  search: "",
  listUsers: [],
};

const todoSlice = createSlice({
  name: "auth",
  initialState: authInitalState,
  reducers: {
    logOutUser: (state, action) => {
      const user = action.payload;
      if (user.id === state.user.id) {
        state.user = null;
      }
      set(state.user);
    },
    changePagination: (state, action) => {
      console.log(action.payload);
      state.pagination.page = action.payload.page;
      state.pagination.limit = action.payload.limit;
    },
  },

  extraReducers: (builder) => {
    //peding là đang xử lý
    builder.addCase(fetchRegister.pending, (state, action) => {
      state.loadingRegister = true;
    });
    //fulfilled là thành công
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.loadingRegister = false;
      alert("Đăng ký thành công");
    });
    //rejected là thông báo thất bại
    builder.addCase(fetchRegister.rejected, (state, action) => {
      state.loadingRegister = false;
    });

    // login----------
    //peding là đang xử lý
    builder.addCase(login.pending, (state, action) => {
      state.loadingLogin = true;
    });
    //fulfilled là thành công
    builder.addCase(login.fulfilled, (state, action) => {
      state.loadingLogin = false;
      if (action.payload.admin) {
        notification.success({
          message: "Đăng nhập thành công!",
          style: { border: "2px solid #71be34" },
          duration: 3,
        });
      }
      state.user = action.payload;
      set(state.user);
    });
    //rejected là thông báo thất bại
    builder.addCase(login.rejected, (state, action) => {
      state.loadingLogin = false;
      notification.error({
        message: "Đăng nhập thất bại!",
        style: { border: "2px solid #71be34" },
        duration: 3,
      });
    });
    builder.addCase(getLoginAdmin.pending, (state, action) => {
      state.loadingLoginAdmin = true;
    });
    //fulfilled là thành công
    builder.addCase(getLoginAdmin.fulfilled, (state, action) => {
      state.loadingLoginAdmin = false;
      state.listUsers = action.payload.users;
      state.pagination.total = action.payload.total;
    });
    //rejected là thông báo thất bại
    builder.addCase(getLoginAdmin.rejected, (state, action) => {
      state.loadingLoginAdmin = false;
    });
  },
});
export const { logOutUser, filterCategory, changePagination, changeSearch } =
  todoSlice.actions;
export const authReducer = todoSlice.reducer;
