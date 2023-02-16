import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../api/auth.api";


//tạo redux thuk để lấy data về

export const fetchRegister = createAsyncThunk(
  "todo/register", //đầu tiên phải lấy tiền tố name:là 'todo' và sau đó là tên của khởi tạo
  async (payload, thunkAPI) => {
    const response = await authApi.register(payload); //await là bất đồng bộ nếu có thèn await thì đợi cho axios chạy xong rồi ms log nó ra
    return response.data;
  }
);

export const login = createAsyncThunk(
  "todo/login", //đầu tiên phải lấy tiền tố name:là 'todo' và sau đó là tên của khởi tạo
  async (payload, thunkAPI) => {
    const response = await authApi.login(payload);//await là bất đồng bộ nếu có thèn await thì đợi cho axios chạy xong rồi ms log nó ra
    return response.data;
  }
);


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
      alert("Đăng ký thành công", action.payload);
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
      state.user = action.payload
      alert("thanh cong")
    });
    //rejected là thông báo thất bại
    builder.addCase(login.rejected, (state, action) => {
      state.loadingLogin = false;
    });
  }
});
export const authReducer = todoSlice.reducer;

