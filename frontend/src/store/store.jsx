import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import AdminProductSlice from "./Admin-Slice/AdminProductSlice";
import ShopProductSlice from "./user-view//shopProductSlice";
import CartSlice from "./cast-slice/CartSlice";
import shopAddressSlice from "./user-view/AddressSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    adminProducts: AdminProductSlice,
    productView: ShopProductSlice,
    cart: CartSlice,
    shopAddress: shopAddressSlice,
  },
});

export default store;
