import {  createSlice } from "@reduxjs/toolkit";
import LocalStorge from "../../localstroge/Localstroge";
import { fetchProduct } from "../action/productAction";




const authInitalState = {
  loadingProduct: false,
  product: [],
};
  
const todoSliceProduct = createSlice({
  name: "cart",
  initialState: authInitalState,
  // reducers: {
  //   AddCart: (state, action) => {
  //     const product = action.payload;
  //     const index = state.productByCategory.findIndex(
  //       (index) => index.id === product.id
  //     );
      
  //     if (index === -1) {
  //       state.productByCategory = [
  //         { ...product, count: 1 ,total:product.price,},
  //         ...state.productByCategory,
  //       ];
        
  //     } else {
  //       state.productByCategory[index].count++;
  //       state.productByCategory[index].total = state.productByCategory[index].count * state.productByCategory[index].price;
  //     }
  //     set(state.productByCategory);
  //   },
  //   DelCart: (state, action) => {
  //     const cateloryProduct = [...state.productByCategory];
  //     const product = action.payload;
  //     const index = state.productByCategory.findIndex(
  //       (index) => index.id === product.id
  //     );
  //     cateloryProduct.splice(index, 1);
  //     state.productByCategory = cateloryProduct;
  //     set(state.productByCategory);
  //   },
  //   increase: (state, action) => {
  //     const data = action.payload;
  //     const index = state.productByCategory.findIndex(
  //       (index) => index.id === data.id
  //     );
  //     state.productByCategory[index].count++;
  //     state.productByCategory[index].total = state.productByCategory[index].count * state.productByCategory[index].price;
  //     set(state.productByCategory);

  //   },
  //   decrease: (state, action) => {
  //     const data = action.payload;
  //     const index = state.productByCategory.findIndex(
  //       (index) => index.id === data.id
  //     );
  //     if (data.count > 0) {
  //       state.productByCategory[index].count--;
  //       state.productByCategory[index].total = state.productByCategory[index].count * state.productByCategory[index].price;
  //     } else {
  //       state.productByCategory.splice(index, 1);
  //     }
  //     set(state.productByCategory);
  //   },
  // },
  extraReducers: (builder) => {
    //peding là đang xử lý
    builder.addCase(fetchProduct.pending, (state, action) => {
      state.loadingProduct = true;
    });
    //fulfilled là thành công
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.loadingProduct = false;
      state.product = action.payload;
    });
    //rejected là thông báo thất bại
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.loadingProduct = false;
    });
  },
});
export const { AddCart, DelCart, increase, decrease, sigin } =
  todoSliceProduct.actions;
export const authReducerProduct = todoSliceProduct.reducer;
