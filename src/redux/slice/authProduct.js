// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { authApi } from "../../api/auth.api";

// export const authApiProduct = createAsyncThunk(
//     "todo/login", //đầu tiên phải lấy tiền tố name:là 'todo' và sau đó là tên của khởi tạo
//     async (payload, thunkAPI) => {
//       const response = await authApi.product(payload); //await là bất đồng bộ nếu có thèn await thì đợi cho axios chạy xong rồi ms log nó ra
//       console.log("response111",response);
//       return response.data;
//     }
//   );

//   const authInitalState = {
//     loadingProduct:false
//   };

//   const todoProductSlice = createSlice({
//     name: "auth",
//     initialState: authInitalState,
//     extraReducers: (builder) => {
//       //peding là đang xử lý
//       builder.addCase(authApiProduct.pending, (state, action) => {
//         state.loadingProduct = true;
//       });
//       //fulfilled là thành công
//       builder.addCase(authApiProduct.fulfilled, (state, action) => {
//         state.loadingProduct = false;
//       });
//       //rejected là thông báo thất bại
//       builder.addCase(authApiProduct.rejected, (state, action) => {
//         state.loadingProduct = false;
//       });
//     },
// });
// export const authProduct = todoProductSlice.reducer;