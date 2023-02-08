
import {configureStore} from "@reduxjs/toolkit"
import { todoReducer } from "../slice/authSlice"
import { listCart, login, user } from "../slice/createrSlice"
const rootReducer = {
    listCart : listCart,
    login : login,
    todoReducer:todoReducer,
    user:user,
}
export const store = configureStore({
    reducer:rootReducer,
})