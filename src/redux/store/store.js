
import {configureStore} from "@reduxjs/toolkit"
import { authReducer } from "../slice/authSlice"
import { productByCategory } from "../slice/productSlice"

const rootReducer = {
    productByCategory:productByCategory,
    authReducer:authReducer,
}
export const store = configureStore({
    reducer:rootReducer,
})