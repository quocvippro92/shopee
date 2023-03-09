import { createSlice } from "@reduxjs/toolkit";

import { createCart, getCustomerCart } from "../action/cartAction";

const cartInitialState = {
  cartList: [],
  loadingCreateCart: false,
  loadingGetCart: false,
  loadingUpdateCartItem: false,
  loadingDeleteCartItem: false,
};

const todoSliceProduct = createSlice({
  name: "cart",
  initialState: cartInitialState,
  extraReducers: (builder) => {
    //peding là đang xử lý
    builder.addCase(createCart.pending, (state, action) => {
      state.loadingCreateCart = true;
    });
    //fulfilled là thành công
    builder.addCase(createCart.fulfilled, (state, action) => {
      state.loadingCreateCart = false;
      // state.cartList = [...state.cartList,action.payload];
    });
    //rejected là thông báo thất bại
    builder.addCase(createCart.rejected, (state, action) => {
      state.loadingCreateCart = false;
    });

    // getCustomerCart
    builder.addCase(getCustomerCart.pending, (state, action) => {
      state.loadingGetCart = true;
    });
    //fulfilled là thành công
    builder.addCase(getCustomerCart.fulfilled, (state, action) => {
      state.loadingGetCart = false;
      state.cartList = action.payload;
    });
    //rejected là thông báo thất bại
    builder.addCase(getCustomerCart.rejected, (state, action) => {
      state.loadingGetCart = false;
    });

    // // updateCart
    // builder.addCase(updateCart.pending, (state, action) => {
    //   state.loadingUpdateCartItem = true;
    // });
    // //fulfilled là thành công
    // builder.addCase(updateCart.fulfilled, (state, action) => {
    //   state.loadingUpdateCartItem = false;

    // });
    // //rejected là thông báo thất bại
    // builder.addCase(updateCart.rejected, (state, action) => {
    //   state.loadingUpdateCartItem = false;
    // });
  },
});

export const authReducerCart = todoSliceProduct.reducer;
