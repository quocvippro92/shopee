import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productApi } from "../../api/product.api";



export const fetchProducts = createAsyncThunk(
  "todo/products", //đầu tiên phải lấy tiền tố name:là 'todo' và sau đó là tên của khởi tạo
  async (payload, thunkAPI) => {
    const { page, limit,category} = payload;
    const response = await productApi.getProductList(page,limit,category); //await là bất đồng bộ nếu có thèn await thì đợi cho axios chạy xong rồi ms log nó ra
    return {product:response.data,total:response.headers["x-total-count"]
    };
  }
);

const authInitalState = {
  loadingProduct: false,
  loadingProductCategory: false,
  pagination: {
    page: 1,
    limit: 10,
    total:0,
    category:"men's clothing",
  },
  products: [],
};

const todoSliceProducts = createSlice({
  name: "products",
  initialState: authInitalState,
  reducers: {
    filterCategory:(state, action)=>{
      state.pagination.category = action.payload 
    },
    changePagination: (state, action) => {
      state.pagination.page = action.payload.page;
      state.pagination.limit = action.payload.limit;
    },
  },

  extraReducers: (builder) => {
    //peding là đang xử lý
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.loadingRegister = true;
    });
    //fulfilled là thành công
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loadingRegister = false;
      state.products = action.payload.product;
      state.pagination.total = action.payload.total;
      
    });
    //rejected là thông báo thất bại
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loadingRegister = false;
    });

  },
});
export const {filterCategory,changePagination} = todoSliceProducts.actions
export const authReducerProducts = todoSliceProducts.reducer;
