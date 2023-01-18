import {createSlice} from "@reduxjs/toolkit"
import LocalStorge from "../../localstroge/Localstroge";


const {get,set} = LocalStorge("cartItem", [])
const initialState = {
    listCart: get(),
    count:0,
}

const todoListCart = createSlice({
    name : "listCart",
    initialState:initialState,
    reducers: {
        AddCart : (state,action)=>{
            const product = action.payload;
            state.listCart = [product,...state.listCart]
            set(state.listCart)
            // console.log("state.listCart",state.listCart);
        },
        DelCart : (state,action)=>{

        },
        increase:(state,action)=>{
            const data=action.payload;
            state.count = state.count + data;
        },
        decrease: (state,action)=>{
            const data = action.payload;
            if(state.count > 0){
                state.count -= data ;
            }
        }

    }
})

export const {AddCart,DelCart,increase,decrease} = todoListCart.actions;
export const listCart = todoListCart.reducer;
