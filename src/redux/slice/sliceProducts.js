import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import { createProductsAdmin } from "../action/actionProductAdmin";
import { fetchProducts } from "../action/productAction";

const authInitalState = {
  loadingProduct: false,
  loadingProductCategory: false,
  loadingCreateproductsAdmin: false,
  pagination: {
    page: 1,
    limit: 8,
    total: 0,
    category: "",
  },
  category: "",
  search: "",
  products: [],
};

const todoSliceProducts = createSlice({
  name: "products",
  initialState: authInitalState,
  reducers: {
    filterCategory: (state, action) => {
      state.pagination.category = action.payload;
    },
    changePagination: (state, action) => {
      state.pagination.page = action.payload.page;
      state.pagination.limit = action.payload.limit;
    },
    changeSearch: (state, action) => {
      state.search = action.payload;
    },
  },

  extraReducers: (builder) => {
    //peding là đang xử lý
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.loadingRegister = true;
    });
    //fulfilled là thành công
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loadingRegister = false;
      state.products = action.payload.product;
      state.pagination.total = action.payload.total;
    });
    //rejected là thông báo thất bại
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loadingRegister = false;
    });

    // creater products
    builder.addCase(createProductsAdmin.pending, (state, action) => {
      state.loadingCreateproductsAdmin = true;
    });
    //fulfilled là thành công
    builder.addCase(createProductsAdmin.fulfilled, (state, action) => {
      state.loadingCreateproductsAdmin = false;
      state.products = action.payload.product;
      notification.success({
        message: "Khởi tạo thành công!",
        style: { border: "2px solid #71be34" },
        duration: 3,
      });
    });
    //rejected là thông báo thất bại
    builder.addCase(createProductsAdmin.rejected, (state, action) => {
      state.loadingCreateproductsAdmin = false;
    });
  },
});
export const { filterCategory, changePagination, changeSearch } =
  todoSliceProducts.actions;
export const authReducerProducts = todoSliceProducts.reducer;
