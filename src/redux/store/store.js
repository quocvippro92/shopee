
import {configureStore} from "@reduxjs/toolkit"
import { authProduct } from "../slice/authProduct"
import { authReducer } from "../slice/authSliceLoginRegister"
import { productByCategory } from "../slice/productSlice"

const rootReducer = {
    productByCategory:productByCategory,
    authReducer:authReducer,
    // authProduct:authProduct
}
export const store = configureStore({
    reducer:rootReducer,
})