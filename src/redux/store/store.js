
import {configureStore} from "@reduxjs/toolkit"
import { listCart } from "../slice/createrSlice"
const rootReducer = {
    listCart : listCart,
}

export const store = configureStore({
    reducer:rootReducer,
})