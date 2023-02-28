import { createSlice } from "@reduxjs/toolkit";
import { profileAddress } from "../action/profileAddressAction";

const authInitalState = {
    address: [],
    loadingAddress: false,
  };
  const todoSlice = createSlice({
    name: "authAddress",
    initialState: authInitalState,
   
    extraReducers: (builder) => {
      //peding là đang xử lý
      builder.addCase(profileAddress.pending, (state, action) => {
        state.loadingAddress = true;
      });
      //fulfilled là thành công
      builder.addCase(profileAddress.fulfilled, (state, action) => {
        state.loadingAddress = false;
        state.address = action.payload
        alert("Đăng ký thành công");    
      });
      //rejected là thông báo thất bại
      builder.addCase(profileAddress.rejected, (state, action) => {
        state.loadingAddress = false;
      });
    },
  });

  export const authReducerAddress = todoSlice.reducer;