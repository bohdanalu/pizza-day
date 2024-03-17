import React, { useEffect } from "react";
import { faTrashCan, faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import styles from "./Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decrement,
  increment,
  deleteItem,
  calcTotalPrice,
} from "../../redux/slice/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.userName.name);
  const state = useSelector((store) => store.cart);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.cartItems.length === 0) {
      navigate("/menu");
    }
  }, [state.cartItems]);

  useEffect(() => {
    dispatch(calcTotalPrice());
  }, [state.cartItems, dispatch]);

  const handleIncrementItem = (item) => {
    dispatch(increment(item));
  };

  const handleDecrementItem = (item) => {
    dispatch(decrement(item));
  };

  const handleDeleteItem = (item) => {
    dispatch(deleteItem(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
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
            Your order{" "}
            <span style={{ fontStyle: "italic" }}>{user && `, ${user}`}</span>
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
