
import {configureStore} from "@reduxjs/toolkit"
import { authReducer } from "../slice/sliceLoginRegister"
import { authReducerCart } from "../slice/cartSlice"
import {  authReducerProducts } from "../slice/sliceProducts"
import { authReducerProduct } from "../slice/sliceProduct"


const rootReducer = {
   
    authReducer:authReducer,
    authReducerProducts:authReducerProducts,
    authReducerCart:authReducerCart,
    authReducerProduct:authReducerProduct
    // authProduct:authProduct
}
export const store = configureStore({
    reducer:rootReducer,
})