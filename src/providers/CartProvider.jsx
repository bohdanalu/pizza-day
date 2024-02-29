import React, { createContext, useReducer } from "react";
import { reducer, initState } from "../reducer/index";
export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
