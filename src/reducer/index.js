import { calcTotalItem, calcTotalPrice } from "../helpers/utils";

export const initState = {
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const isExistIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (isExistIndex === -1) {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, qty: 1 }],
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + action.payload.price,
        };
      } else {
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[isExistIndex].qty += 1;
        return {
          ...state,
          cartItems: updatedCartItems,
          totalItems: calcTotalItem(updatedCartItems),
          totalPrice: calcTotalPrice(updatedCartItems),
        };
      }

    case "INCREMENT_ITEM":
      const updatedCartItemsIncr = state.cartItems.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            qty: item.qty + 1,
          };
        }
        return item;
      });

      return {
        ...state,
        cartItems: updatedCartItemsIncr,
        totalItems: calcTotalItem(updatedCartItemsIncr),
        totalPrice: calcTotalPrice(updatedCartItemsIncr),
      };

    case "DECREMENT_ITEM":
      const updatedCartItemsDecr = state.cartItems.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            qty: item.qty - 1,
          };
        }
        return item;
      });

      return {
        ...state,
        cartItems: updatedCartItemsDecr,
        totalItems: calcTotalItem(updatedCartItemsDecr),
        totalPrice: calcTotalPrice(updatedCartItemsDecr),
      };

    case "DELETE_ITEM":
      const itemToDelete = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      const updatedCartItemsDel = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      const deletedItemQty = itemToDelete.qty;

      return {
        ...state,
        cartItems: updatedCartItemsDel,
        totalItems: calcTotalItem(updatedCartItemsDel),
        totalPrice: calcTotalPrice(updatedCartItemsDel),
      };
  }
};
