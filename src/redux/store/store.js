import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../slice/sliceLoginRegister";
import { authReducerCart } from "../slice/cartSlice";
import { authReducerProducts } from "../slice/sliceProducts";
import { authReducerProduct } from "../slice/sliceProduct";
import { authReducerAddress } from "../slice/sliceProfileAddress";
import { authReducerListProductAdmin } from "../slice/sliceProductAdmin";

const rootReducer = {
  authReducer: authReducer,
  authReducerProducts: authReducerProducts,
  authReducerCart: authReducerCart,
  authReducerProduct: authReducerProduct,
  authReducerAddress: authReducerAddress,
  authReducerListProductAdmin: authReducerListProductAdmin,
  // authProduct:authProduct
};
export const store = configureStore({
  reducer: rootReducer,
});
