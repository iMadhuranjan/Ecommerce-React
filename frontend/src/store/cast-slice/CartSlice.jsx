import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  isLoading: false,
  // sheetOpen:true
};

export const addtoCartProduct = createAsyncThunk(
  "/cart/add",
  async ({ userId, productId, quantity }) => {
    const result = await axios.post("http://localhost:5000/api/shop/cart/addcast", {
      userId,
      productId,
      quantity,
    });
    return result?.data;
  }
);

export const fetchUserCart = createAsyncThunk(
  "/cart/fetch",
  async ({ userId }) => {
    const result = await axios.get(
      `http://localhost:5000/api/shop/cart/get/${userId}`
    );
    return result.data;
  }
);

export const updaateCart = createAsyncThunk(
  "cart/update",
  async ({ productId, userId, quantity }) => {
    try {
      const result = await axios.put(
        "http://localhost:5000/api/shop/cart/update",
        { productId, userId, quantity }
      );
      return result.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteCartItems = createAsyncThunk(
  "/cart/deleteCartItems",
  async ({ productId, userId }) => {
    const result = await axios.delete(
      `http://localhost:5000/api/shop/cart/${userId}/${productId}`
    );
    return result.data;
  }
);

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    sheetOpenKaro:(state)=>{
      state.sheetOpen=true
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addtoCartProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addtoCartProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems=action.payload.data;
      })
      .addCase(addtoCartProduct.rejected, (state, action) => {
        state.isLoading = true;
        state.cartItems=[];

      })


      .addCase(fetchUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems=action.payload.data;
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.isLoading = true;
        state.cartItems=[];

      })



      .addCase(updaateCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updaateCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data || [];
      })
      .addCase(updaateCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })



      .addCase(deleteCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems=action.payload.data;
      })
      .addCase(deleteCartItems.rejected, (state, action) => {
        state.isLoading = true;
        state.cartItems=[];

      })
      
      
      
      ;
  },
});
export const {sheetOpenKaro}= cartSlice.actions;

export default cartSlice.reducer;