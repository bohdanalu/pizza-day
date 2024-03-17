import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (!existItem) {
        state.cartItems.push({ ...action.payload, qty: 1 });
      } else {
        existItem.qty = existItem.qty + 1;
      }
    },

    increment: (state, action) => {
      const foundItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (foundItem) {
        foundItem.qty++;
      }
    },

    decrement: (state, action) => {
      const foundItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (foundItemIndex !== -1) {
        const foundItem = state.cartItems[foundItemIndex];
        if (foundItem.qty > 0) {
          foundItem.qty--;
          if (foundItem.qty === 0) {
            state.cartItems.splice(foundItemIndex, 1); // Видаляємо товар, якщо його кількість стала 0
          }
        }
      }
    },

    deleteItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    },

    clearCart: (state) => {
      state.cartItems = [];
    },

    calcTotalPrice: (state) => {
      state.totalPrice = state.cartItems.reduce(
        (sum, item) => sum + item.qty * item.unitPrice,
        0
      );
    },

    calcTotalItems: (state) => {
      state.totalItems = state.cartItems.reduce(
        (sum, item) => sum + item.qty,
        0
      );
    },
  },
});

export const {
  addItem,
  increment,
  decrement,
  deleteItem,
  clearCart,
  calcTotalPrice,
  calcTotalItems,
} = cartSlice.actions;

export default cartSlice.reducer;
