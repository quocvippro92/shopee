import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";
import { authApi } from "../../api/auth.api";

export const fetchRegister = createAsyncThunk(
  "todo/register", //đầu tiên phải lấy tiền tố name:là 'todo' và sau đó là tên của khởi tạo
  async (payload, thunkAPI) => {
    const response = await authApi.register(payload); //await là bất đồng bộ nếu có thèn await thì đợi cho axios chạy xong rồi ms log nó ra
    notification.success({
      message: "Đăng kí thanh cong",
      style: { border: "2px solid #71be34" },
      duration: 3,
    });
    return response.data;
  }
);

export const login = createAsyncThunk(
  "todo/login", //đầu tiên phải lấy tiền tố name:là 'todo' và sau đó là tên của khởi tạo
  async (payload, thunkAPI) => {
    const response = await authApi.login(payload); //await là bất đồng bộ nếu có thèn await thì đợi cho axios chạy xong rồi ms log nó ra
    return response.data.user;
  }
);

export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (payload, thunkAPI) => {
    const response = await authApi.deleteUser(payload);
    return response.data;
  }
);

export const getLoginAdmin = createAsyncThunk(
  "admin/getProductAdmin", //đầu tiên phải lấy tiền tố name:là 'todo' và sau đó là tên của khởi tạo
  async (payload, thunkAPI) => {
    const { page, limit, category, textSearch } = payload;
    const response = await authApi.getLoginAdmin(
      page,
      limit,
      category,
      textSearch
    );
    //await là bất đồng bộ nếu có thèn await thì đợi cho axios chạy xong rồi ms log nó ra
    return { users: response.data, total: response.headers["x-total-count"] };
  }
);
