import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminApi } from "../../api/listProductAdmin.api";

export const createProductAdmin = createAsyncThunk(
  "admin/createProductAdmin", //đầu tiên phải lấy tiền tố name:là 'todo' và sau đó là tên của khởi tạo
  async (payload, thunkAPI) => {
    const data = payload;
    const response = await adminApi.createProductAdmin(data); //await là bất đồng bộ nếu có thèn await thì đợi cho axios chạy xong rồi ms log nó ra
    console.log("response", response);
    // const list = await adminApi.getProductAdmin(data.customer_id);
    // const productAdmin = list.data.map((productUser) => productUser.product_id);
    // let response;
    // if (!productAdmin.includes(data.product_id)) {
    //   response = await adminApi.createProductAdmin(data);
    // } else {
    //   const productUser = list.data.filter(
    //     (item) => item.product_id === data.product_id
    //   )[0];
    //   productUser.quantity = productUser.quantity + 1;
    //   productUser.size = productUser.size + "/" + data.size;
    //   productUser.color = productUser.color + "/" + data.color;

    //   await adminApi.updateProductAdmin(productUser.id, productUser);
    // }
    return response.data;
  }
);
