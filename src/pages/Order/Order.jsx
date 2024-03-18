import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePriority } from "../../redux/slice/orderSlice";
import Button from "../../components/Button/Button";
import styles from "./Order.module.css";

const Order = () => {
  const orderState = useSelector((store) => store.order);
  const dispatch = useDispatch();
  const { orderId, orderData } = orderState;
  const {
    status,
    priority,
    estimatedDelivery,
    createdAt,
    orderPrice,
    priorityPrice,
    cart,
  } = orderData;

  const date = new Date(estimatedDelivery);

  const options = {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDate = date.toLocaleString("en-US", options);

  const timeDiffInMin = Math.floor((date - new Date(createdAt)) / (1000 * 60));

  const handleChangePriority = useCallback(async () => {
    dispatch(changePriority({ orderId }));
  }, [dispatch, orderId]);

  return (
    <div className="section">
      <h2 className="title">
        <span>{`Order: #${orderId}`} </span>{" "}
        <span style={{ fontSize: "24px" }}> {`status: ${status}`}</span>{" "}
      </h2>
      <div className={styles.order__wrap}>
        <div className={styles.order__box}>
          {priority && <span className={styles.order__priority}>Priority</span>}
          <span className={styles.order__prepare}>Preparing order</span>
        </div>
        <div className={styles.order__delivery}>
          <p>{`Only ${timeDiffInMin} minutes left 😋`}</p>
          <p>
            (Estimated delivery: <span>{formattedDate}</span>)
          </p>
        </div>
        <ul>
          {cart.map((cartItem) => {
            return (
              <li className={styles.order__cartItem} key={cartItem.pizzaId}>
                <div className={styles.order__cartInfo}>
                  <span>{`${cartItem.quantity} x`}</span>
                  <p>{cartItem.name}</p>
                </div>
                <span>{`${cartItem.totalPrice} \u20AC`}</span>
              </li>
            );
          })}
        </ul>

        <div className={styles.order__bottom}>
          <p>
            Price pizza: <span>{`${orderPrice} \u20AC`}</span>
          </p>
          {priority && (
            <p>
              Price priority: <span>{`${priorityPrice} \u20AC`}</span>
            </p>
          )}

          <p>
            To pay on delivery:{" "}
            <span>{`${orderPrice + priorityPrice} \u20AC`}</span>
          </p>
        </div>
        {!priority && (
          <div className={styles.order__buttonContainer}>
            <Button type="button" onClick={handleChangePriority}>
              Prioritize
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
