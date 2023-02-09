import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import LocalStorge from "../../localstroge/Localstroge";


//tạo redux thuk để lấy data về
const { get, set } = LocalStorge("cartItem", []);
const productInitalState = {
  productByCategory: get(),
  currentPage: 1,
  perPage: 10,
  textSearch: "",
};

const productSlice = createSlice({
  name: "product",
  initialState: productInitalState,
  reducers: {
    AddCart: (state, action) => {
      const product = action.payload;
      const index = state.productByCategory.findIndex(
        (index) => index.id === product.id
      );
      if (index === -1) {
        state.productByCategory = [{ ...product, count: 1 }, ...state.productByCategory];
      } else {
        state.productByCategory[index].count++;
      }
      set(state.productByCategory);
    },
    DelCart: (state, action) => {
      const product = action.payload
      console.log("product",product)
      const index = state.productByCategory.findIndex(
        (index) => index.id === product.id
      );
      if(index !== -1){
        state.productByCategory.splice(state.productByCategory[product.id],1)
      }
      set(state.productByCategory)
    },
    increase: (state, action) => {
      const data = action.payload;
      const index = state.productByCategory.findIndex((index) => index.id === data.id);
      state.listCart[index].count++;
    },
    decrease: (state, action) => {
      const data = action.payload;
      const index = state.productByCategory.findIndex((index) => index.id === data.id);
      if (data.count > 0) {
        state.productByCategory[index].count--;
      } else {
        state.productByCategory.splice(index, 1);
      }
      set(state.productByCategory);
    },
  },
});
export const { AddCart, DelCart, increase, decrease, sigin } =
productSlice.actions;
export const productByCategory = productSlice.reducer;
