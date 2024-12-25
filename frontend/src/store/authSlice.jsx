import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isUserLoggedIn: false,
  isLoading: true,
  user: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const loggedInUser = createAsyncThunk(
  "/auth/login",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const checkAuth = createAsyncThunk("/auth/checkAuth", async () => {
  const response = await axios.get(
    "http://localhost:5000/api/auth/check-auth",
    {
      withCredentials: true,
      header: {
        "Cache-Control": "no-cache no-store must-revalidate proxy-revalidate",
      },
    }
  );
  return response.data;
});

export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  const response = await axios.post("http://localhost:5000/api/auth/logout",{}, {
    withCredentials: true,
  });
  return response.data;
});

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setUserInfo(state, action) {},
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isUserLoggedIn = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isUserLoggedIn = false;
      })
      .addCase(loggedInUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loggedInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.user = action?.payload?.success ? action?.payload?.user : null;
        state.isUserLoggedIn = action?.payload?.success ? true : false;
      })
      .addCase(loggedInUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isUserLoggedIn = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.user = action?.payload?.success ? action?.payload?.user : null;
        state.isUserLoggedIn = action?.payload?.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isUserLoggedIn = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isUserLoggedIn = false;
      })
      ;
  },
});

export const { setUserInfo } = authSlice.actions;
export default authSlice.reducer;
