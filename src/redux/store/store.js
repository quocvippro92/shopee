
import {configureStore} from "@reduxjs/toolkit"
import { todoReducer } from "../slice/authSlice"
import { listCart } from "../slice/createrSlice"
const rootReducer = {
    listCart : listCart,
    todoReducer:todoReducer
}

export const store = configureStore({
    reducer:rootReducer,
})