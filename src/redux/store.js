import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import cartReducer from "./slice/cartSlice";
import menuReducer from "./slice/menuSlice";
import orderReducer from "./slice/orderSlice";

export const store = configureStore({
  reducer: {
    userName: userReducer,
    cart: cartReducer,
    menu: menuReducer,
    order: orderReducer,
  },
});
