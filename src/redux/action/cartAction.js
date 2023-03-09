import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";
import { cartApi } from "../../api/cart.api";

export const createCart = createAsyncThunk(
  "cart/addCustomerCart", //đầu tiên phải lấy tiền tố name:là 'todo' và sau đó là tên của khởi tạo
  async (payload, thunkAPI) => {
    const data = payload;
    const list = await cartApi.getCustomerCart(data.customer_id);
    const cartList = list.data.map((cart) => cart.product_id);
    let response;
    if (!cartList.includes(data.product_id)) {
      response = await cartApi.createCustomerCartItem(data);
    } else {
      const cart = list.data.filter(
        (item) => item.product_id === data.product_id
      )[0];
      cart.quantity = cart.quantity + 1;
      cart.size = cart.size + "/" + data.size;
      cart.color = cart.color + "/" + data.color;

      await cartApi.updateCart(cart.id, cart);
    }
    notification.success({
      message: "Thêm sản phẩm thành công!",
      style: { border: "2px solid #71be34" },
      duration: 3,
    });
    return response.data;
  }
);

export const getCustomerCart = createAsyncThunk(
  "cart/getCustomerCart", //đầu tiên phải lấy tiền tố name:là 'todo' và sau đó là tên của khởi tạo
  async (payload, thunkAPI) => {
    const customerId = payload;
    const response = await cartApi.getCustomerCart(customerId); //await là bất đồng bộ nếu có thèn await thì đợi cho axios chạy xong rồi ms log nó ra
    return response.data;
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (payload, thunkAPI) => {
    // const {cartId ,cart} = payload
    const response = await cartApi.updateCart(payload.cartId, payload.objCart);
    //await là bất đồng bộ nếu có thèn await thì đợi cho axios chạy xong rồi ms log nó ra
    return response.data;
  }
);

export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async (payload, thunkAPI) => {
    const cartItemId = payload;
    const response = await cartApi.deleteCart(cartItemId);
    //await là bất đồng bộ nếu có thèn await thì đợi cho axios chạy xong rồi ms log nó ra
    return response.data;
  }
);
