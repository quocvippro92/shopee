import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../api/auth.api";
import Login from "../../page/Login";

//tạo redux thuk để lấy data về

export const fetchRegister = createAsyncThunk(
  "todo/fetchRegister", //đầu tiên phải lấy tiền tố name:là 'todo' và sau đó là tên của khởi tạo
  async (payload, thunkAPI) => {
    const response = await authApi.register(payload); //await là bất đồng bộ nếu có thèn await thì đợi cho axios chạy xong rồi ms log nó ra
    return response.data;
  }
);

const todoInitalState = {
  user: null,
  fetching: false,
};


const todoSlice = createSlice({
  name: "register",
  initialState: todoInitalState,
  extraReducers: (builder) => {
    //peding là đang xử lý
    builder.addCase(fetchRegister.pending, (state, action) => {
      state.fetching = true;
    });
    //fulfilled là thành công
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.fetching = false;
      alert("Đăng ký thành công", action.payload);
    });
    //rejected là thông báo thất bại
    builder.addCase(fetchRegister.rejected, (state, action) => {
      state.fetching = false;
    });
  },
});

export const todoReducer = todoSlice.reducer;
