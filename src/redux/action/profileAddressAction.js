import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../../api/auth.api";

export const profileAddress = createAsyncThunk(
    "todo/profileAddress", //đầu tiên phải lấy tiền tố name:là 'todo' và sau đó là tên của khởi tạo
    async (payload, thunkAPI) => {
      const value = payload;
      const response = await authApi.profileAddress(value); //await là bất đồng bộ nếu có thèn await thì đợi cho axios chạy xong rồi ms log nó ra
      return response.data;
    }
);
  
export const getCustomerAddress = createAsyncThunk(
  "cart/getCustomerAddress", //đầu tiên phải lấy tiền tố name:là 'todo' và sau đó là tên của khởi tạo
  async (payload, thunkAPI) => {
    const customerId = payload;
    const response = await authApi.getCustomerAddress(customerId); //await là bất đồng bộ nếu có thèn await thì đợi cho axios chạy xong rồi ms log nó ra
    return response.data;
  }
);