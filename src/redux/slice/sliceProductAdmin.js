import { createSlice } from "@reduxjs/toolkit";
import { createProductAdmin } from "../action/actionProductAdmin";

const slideProductAdmin = {
  listProduct: [],
  loadingCreateproductAdmin: false,
};

const todoSliceProductAdmin = createSlice({
  name: "Admin",
  initialState: slideProductAdmin,
  extraReducers: (builder) => {
    builder.addCase(createProductAdmin.pending, (state, action) => {
      state.loadingCreateproductAdmin = true;
    });
    //fulfilled là thành công
    builder.addCase(createProductAdmin.fulfilled, (state, action) => {
      state.loadingCreateproductAdmin = false;
      state.listProduct = action.payload;
      // state.cartList = [...state.cartList,action.payload];
    });
    //rejected là thông báo thất bại
    builder.addCase(createProductAdmin.rejected, (state, action) => {
      state.loadingCreateproductAdmin = false;
      alert("that bai");
    });
  },
});
export const authReducerListProductAdmin = todoSliceProductAdmin.reducer;
