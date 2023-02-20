import { createAsyncThunk } from "@reduxjs/toolkit";
import { productApi } from "../../api/product.api";

export const fetchProducts = createAsyncThunk(
    "todo/products", //đầu tiên phải lấy tiền tố name:là 'todo' và sau đó là tên của khởi tạo
    async (payload, thunkAPI) => {
      const { page, limit, category } = payload;
      const response = await productApi.getProductList(page, limit, category); //await là bất đồng bộ nếu có thèn await thì đợi cho axios chạy xong rồi ms log nó ra
      return { product: response.data, total: response.headers["x-total-count"] };
    }
  );