import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast, ToastContainer } from "react-toastify";
import { authApi } from "../../api/auth.api";
import { fetchRegister, login } from "../action/auth.action";

//tạo redux thuk để lấy data về



const authInitalState = {
  user: null,
  loadingRegister: false,
  loadingLogin: false,
};

const todoSlice = createSlice({
  name: "auth",
  initialState: authInitalState,
  extraReducers: (builder) => {
    //peding là đang xử lý
    builder.addCase(fetchRegister.pending, (state, action) => {
      state.loadingRegister = true;
    });
    //fulfilled là thành công
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.loadingRegister = false;
      alert("Đăng ký thành công");
    });
    //rejected là thông báo thất bại
    builder.addCase(fetchRegister.rejected, (state, action) => {
      state.loadingRegister = false;
    });

    // login----------
    //peding là đang xử lý
    builder.addCase(login.pending, (state, action) => {
      state.loadingLogin = true;
    });
    //fulfilled là thành công
    builder.addCase(login.fulfilled, (state, action) => {
      state.loadingLogin = false;
      if (state.loadingLogin === false) {
        alert("dang nhap thanh cong")
      }
      state.user = action.payload;
    });
    //rejected là thông báo thất bại
    builder.addCase(login.rejected, (state, action) => {
      state.loadingLogin = false;
      alert("sai gmail hoac mat khau");
    });
  },
});
export const authReducer = todoSlice.reducer;
