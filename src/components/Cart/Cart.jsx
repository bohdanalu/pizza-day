import React, { useContext, useEffect } from "react";
import { CartContext } from "../../providers/CartProvider";
import { UserContext } from "../../providers/UserProvider";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

import Button from "../Button/Button";
import styles from "./Cart.module.css";

const Cart = () => {
  const { state, dispatch } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.cartItems.length === 0) {
      navigate("/menu");
    }
  }, [state.cartItems]);

  const handleIncrementItem = (item) => {
    dispatch({
      type: "INCREMENT_ITEM",
      payload: item,
    });
  };

  const handleDecrementItem = (item) => {
    dispatch({
      type: "DECREMENT_ITEM",
      payload: item,
    });
  };

  const handleDeleteItem = (item) => {
    dispatch({
      type: "DELETE_ITEM",
      payload: item,
    });
  };

  return (
    <>
      {state.cartItems.length > 0 && (
        <div style={{ padding: "100px" }}>
          <h2 className={styles.cart__user}>
            Your order, <span style={{ fontStyle: "italic" }}>{user}</span>
          </h2>
          {state.cartItems.length > 0 &&
            state.cartItems.map((item) => {
              return (
                <div className={styles.cart__item} key={item.id}>
                  <img
                    className={styles.cart__img}
                    src={item.imageUrl}
                    alt={item.name}
                  />
                  <div className={styles.cart__info}>
                    <p>{item.name}</p>
                    <span className={styles.cart__price}>
                      {parseFloat(item.unitPrice) + " \u20AC"}
                    </span>
                  </div>
                  <div>
                    <Button
                      type="button"
                      onClick={() => handleIncrementItem(item)}
                    >
                      +
                    </Button>
                    <span className={styles.cart__qty}>{item.qty}</span>
                    <Button
                      type="button"
                      onClick={() => handleDecrementItem(item)}
                    >
                      -
                    </Button>
                  </div>
                  <Button type="button" onClick={() => handleDeleteItem(item)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </Button>
                </div>
              );
            })}
          <p className={styles.cart__total}>
            Total: <span>{state.totalPrice + " \u20AC"}</span>
          </p>
        </div>
      )}
    </>
  );
};

export default Cart;
