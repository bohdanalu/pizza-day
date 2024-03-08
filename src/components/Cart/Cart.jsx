import React, { useContext, useEffect } from "react";
import { CartContext } from "../../providers/CartProvider";
import { UserContext } from "../../providers/UserProvider";
import { faTrashCan, faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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

  const handleClearCart = () => {
    dispatch({
      type: "CLEAR-CART",
    });
  };

  return (
    <>
      {state.cartItems.length > 0 && (
        <div className={styles.cart__container}>
          <Link className={styles.cart__backLink} to="/menu">
            <FontAwesomeIcon
              style={{ marginRight: "10px" }}
              icon={faArrowLeftLong}
            />
            Back to Menu
          </Link>
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
                  <div className="btns">
                    <Button
                      type="button"
                      onClick={() => handleIncrementItem(item)}
                    >
                      +
                    </Button>
                    <span className="qty">{item.qty}</span>
                    <Button
                      type="button"
                      onClick={() => handleDecrementItem(item)}
                    >
                      -
                    </Button>
                    <Button
                      type="button"
                      onClick={() => handleDeleteItem(item)}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </Button>
                  </div>
                </div>
              );
            })}
          <p className={styles.cart__total}>
            Total: <span>{state.totalPrice + " \u20AC"}</span>
          </p>
          <div
            className={styles.cart__bottom}
            style={{ display: "flex", gap: "20px" }}
          >
            <Link
              to="/order/new"
              className="button button--light"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Order Pizzas
            </Link>
            <Button type="button" onClick={handleClearCart}>
              Clear Cart
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
