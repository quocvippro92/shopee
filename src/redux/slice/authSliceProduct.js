import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productApi } from "../../api/product.api";
import LocalStorge from "../../localstroge/Localstroge";


const { get, set } = LocalStorge("listProduct",[]);
export const fetchProduct = createAsyncThunk(
  "todo/product", //đầu tiên phải lấy tiền tố name:là 'todo' và sau đó là tên của khởi tạo
  async (payload, thunkAPI) => {
    const response = await productApi.product(payload); //await là bất đồng bộ nếu có thèn await thì đợi cho axios chạy xong rồi ms log nó ra
    return response.data;
  }
);
const authInitalState = {
  loadingProduct: false,
  productByCategory: get(),
  product: [],
};

const todoSliceProduct = createSlice({
  name: "product",
  initialState: authInitalState,
  reducers: {
    AddCart: (state, action) => {
      const product = action.payload;
      const index = state.productByCategory.findIndex(
        (index) => index.id === product.id
      );
      if (index === -1) {
        state.productByCategory = [
          { ...product, count: 1 },
          ...state.productByCategory,
        ];
      } else {
        state.productByCategory[index].count++;
      }
      set(state.productByCategory);
    },
    DelCart: (state, action) => {
      const cateloryProduct = [...state.productByCategory];
      const product = action.payload;
      const index = state.productByCategory.findIndex(
        (index) => index.id === product.id
      );
      cateloryProduct.splice(index, 1);
      state.productByCategory = cateloryProduct;
      set(state.productByCategory);
    },
    increase: (state, action) => {
      const data = action.payload;
      const index = state.productByCategory.findIndex(
        (index) => index.id === data.id
      );
      state.productByCategory[index].count++;
    },
    decrease: (state, action) => {
      const data = action.payload;
      const index = state.productByCategory.findIndex(
        (index) => index.id === data.id
      );
      if (data.count > 0) {
        state.productByCategory[index].count--;
      } else {
        state.productByCategory.splice(index, 1);
      }
      set(state.productByCategory);
    },
  },
  extraReducers: (builder) => {
    //peding là đang xử lý
    builder.addCase(fetchProduct.pending, (state, action) => {
      state.loadingProduct = true;
    });
    //fulfilled là thành công
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.loadingProduct = false;
      state.product = action.payload;
    });
    //rejected là thông báo thất bại
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.loadingProduct = false;
    });
  },
});
export const { AddCart, DelCart, increase, decrease, sigin } =
  todoSliceProduct.actions;
export const authReducerProduct = todoSliceProduct.reducer;
