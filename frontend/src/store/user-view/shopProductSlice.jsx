import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  product: [],
  singleProduct:null
};

export const fetchAllProductsUser = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({ filterProduct, sortByParam }) => {
    const newParam = new URLSearchParams({
      ...filterProduct,
      sortby: sortByParam,
    });
    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get?${newParam}`
    );
    console.log(result);
    return result?.data;
  }
);

export const getProductBytId = createAsyncThunk(
  "/products/fetchAllProductById",
  async (id) => {
    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get/${id}`
    );
    // console.log(result);
    return result?.data;
  }
);

const shopingProductSlice = createSlice({
  name: "shopingProducts",
  initialState,
  reducers: {
    setProductDetails: (state)=>{
      state.singleProduct =null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsUser.pending, (state, action) => {
        state.isLoading = true;
        // state.product=action.payload;
      })
      .addCase(fetchAllProductsUser.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action?.payload);
        state.product = action.payload.data;
      })
      .addCase(fetchAllProductsUser.rejected, (state, action) => {
        state.isLoading = false;
        state.product = [];
      })
      .addCase(getProductBytId.pending, (state, action) => {
        state.isLoading = true;
        // state.product=action.payload;
      })
      .addCase(getProductBytId.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log(action?.payload);
        state.singleProduct = action.payload.data;
      })
      .addCase(getProductBytId.rejected, (state, action) => {
        state.isLoading = false;
        state.product = null;
      });
  },
});

 export const {setProductDetails} = shopingProductSlice.actions;

export default shopingProductSlice.reducer;
