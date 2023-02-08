
import {configureStore} from "@reduxjs/toolkit"
import { todoReducer } from "../slice/authSlice"
import { listCart, login } from "../slice/createrSlice"
const rootReducer = {
    listCart : listCart,
    login : login,
    todoReducer:todoReducer
}
export const store = configureStore({
    reducer:rootReducer,
})