import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";
import { adminApi } from "../../api/listProductAdmin.api";

export const createProductAdmin = createAsyncThunk(
  "admin/createProductAdmin", //đầu tiên phải lấy tiền tố name:là 'todo' và sau đó là tên của khởi tạo
  async (payload, thunkAPI) => {
    const data = payload;
    const response = await adminApi.createProductAdmin(data); //await là bất đồng bộ nếu có thèn await thì đợi cho axios chạy xong rồi ms log nó ra
    return response.data;
  }
);
export const createProductsAdmin = createAsyncThunk(
  "admin/createProductsAdmin", //đầu tiên phải lấy tiền tố name:là 'todo' và sau đó là tên của khởi tạo
  async (payload, thunkAPI) => {
    const data = payload;
    const response = await adminApi.createProductsAdmin(data); //await là bất đồng bộ nếu có thèn await thì đợi cho axios chạy xong rồi ms log nó ra
    
    return response.data;
  }
);
export const getOrderAdmin = createAsyncThunk(
  "admin/getOrderAdmin", //đầu tiên phải lấy tiền tố name:là 'todo' và sau đó là tên của khởi tạo
  async (payload, thunkAPI) => {
    const { page, limit, category, textSearch } = payload;
    const response = await adminApi.getOrderAdmin(
      page,
      limit,
      category,
      textSearch
    );
    //await là bất đồng bộ nếu có thèn await thì đợi cho axios chạy xong rồi ms log nó ra
    return {
      product: response.data,
      total: response.headers["x-total-count"],
    };
  }
);

export const updateOrderAdmin = createAsyncThunk(
  "admin/updateOrderAdmin",
  async (payload, thunkAPI) => {
    const response = await adminApi.updateOrderAdmin(
      payload.id,
      payload.objValue
    );
    if (payload.id && payload.objValue !== null) {
      notification.success({
        message: "Edit thanh cong",
        style: { border: "2px solid #71be34" },
        duration: 3,
      });
    }
    return response.data;
  }
);

export const deleteOrderAdmin = createAsyncThunk(
  "admin/deleteOrderAdmin",
  async (payload, thunkAPI) => {
    const cartItemId = payload;
    const response = await adminApi.deleteOrderAdmin(cartItemId);
    //await là bất đồng bộ nếu có thèn await thì đợi cho axios chạy xong rồi ms log nó ra
    return response.data;
  }
);

export const deleteProductAdmin = createAsyncThunk(
  "admin/deleteProductAdmin",
  async (payload, thunkAPI) => {
    const cartItemId = payload;
    const response = await adminApi.deleteProductAdmin(cartItemId);
    //await là bất đồng bộ nếu có thèn await thì đợi cho axios chạy xong rồi ms log nó ra
    return response.data;
  }
);
