
import {configureStore} from "@reduxjs/toolkit"
import { authReducer } from "../slice/sliceLoginRegister"
import { authReducerProduct } from "../slice/sliceProduct"
import {  authReducerProducts } from "../slice/sliceProducts"


const rootReducer = {
   
    authReducer:authReducer,
    authReducerProducts:authReducerProducts,
    authReducerProduct:authReducerProduct,
    // authProduct:authProduct
}
export const store = configureStore({
    reducer:rootReducer,
})