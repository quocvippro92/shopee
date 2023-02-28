import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../../api/auth.api";

export const fetchRegister = createAsyncThunk(
    "todo/register", //đầu tiên phải lấy tiền tố name:là 'todo' và sau đó là tên của khởi tạo
    async (payload, thunkAPI) => {
      const response = await authApi.register(payload); //await là bất đồng bộ nếu có thèn await thì đợi cho axios chạy xong rồi ms log nó ra
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

