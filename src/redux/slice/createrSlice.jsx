import { createSlice } from "@reduxjs/toolkit";
import LocalStorge from "../../localstroge/Localstroge";

const { get, set } = LocalStorge("cartItem", []);
const initialState = {
  listCart: get(),
  login: false,
};

const todoListCart = createSlice({
  name: "listCart",
  initialState: initialState,
  reducers: {
    AddCart: (state, action) => {
      const product = action.payload;
      const index = state.listCart.findIndex(
        (index) => index.id === product.id
      );
      console.log(index);
      if (index === -1) {
        state.listCart = [{ ...product, count: 1 }, ...state.listCart];
      } else {
        state.listCart[index].count++;
      }
      set(state.listCart);
    },
    DelCart: (state, action) => {},
    increase: (state, action) => {
      const data = action.payload;
      const index = state.listCart.findIndex((index) => index.id === data.id);
      state.listCart[index].count++;
    },
    decrease: (state, action) => {
      const data = action.payload;
      const index = state.listCart.findIndex((index) => index.id === data.id);
      if (data.count > 0) {
        state.listCart[index].count--;
      } else {
        state.listCart.splice(index, 1);
      }
      set(state.listCart);
    },
    sigin: (state, action) => {
      state.login = action.payload;
    },
  },
});

export const { AddCart, DelCart, increase, decrease, sigin } =
  todoListCart.actions;
export const listCart = todoListCart.reducer;
export const login = todoListCart.reducer;
