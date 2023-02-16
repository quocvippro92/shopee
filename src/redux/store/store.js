
import {configureStore} from "@reduxjs/toolkit"
import { authReducer } from "../slice/authSliceLoginRegister"
import { authReducerProduct } from "../slice/authSliceProduct"
import {  authReducerProducts } from "../slice/authSliceProducts"


const rootReducer = {
   
    authReducer:authReducer,
    authReducerProducts:authReducerProducts,
    authReducerProduct:authReducerProduct,
    // authProduct:authProduct
}
export const store = configureStore({
    reducer:rootReducer,
})