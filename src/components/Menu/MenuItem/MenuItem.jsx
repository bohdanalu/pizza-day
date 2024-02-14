import { useState } from "react";
import Button from "../../Button/Button";
import styles from "./MenuItem.module.css";

const MenuItem = ({ img, title, price, soldOut, ingredients, id }) => {
  const [amount, setAmount] = useState("");
  const [isInCart, setIsInCart] = useState(false);

  const handleChangeValue = (e) => {
    const value = Number(e.target.value);
    if (e.target.value === "") {
      setAmount("");
    } else {
      setAmount(value);
    }

    setIsInCart(value > 0 || e.target.value === "");
  };

  const handleAddItem = () => {
    setIsInCart(true);
    setAmount(1);
  };

  const handleRemoveItem = () => {
    setIsInCart(false);
    setAmount(0);
  };

  const handleIncreaseAmount = () => {
    setAmount((prev) => prev + 1);
    setIsInCart(true);
  };

  const handleDecreaseAmount = () => {
    if (amount === 1) {
      handleRemoveItem();
    }
    setAmount((prev) => Math.max(prev - 1, 0));
  };

  return (
    <li className={styles.pizza} id={id}>
      <img className={styles.pizza__image} src={img} alt={title} />
      <div className={styles.pizza__info}>
        <h3 className={styles.pizza__name}>{title}</h3>
        <div className={styles.pizza__ingredients}>
          {ingredients.join(", ")}
        </div>
        <div className={styles.pizza__actions}>
          <span className={styles.pizza__price}>
            {soldOut ? <p>Sold out</p> : price + " \u20AC"}
          </span>
          {isInCart && (
            <div className={styles.pizza__amount}>
              <Button type="button" onClick={handleDecreaseAmount}>
                -
              </Button>
              <input
                className={styles.pizza__input}
                type="text"
                onChange={handleChangeValue}
                value={amount}
              />
              <Button type="button" onClick={handleIncreaseAmount}>
                +
              </Button>
            </div>
          )}

          {!soldOut && (
            <Button
              type="button"
              onClick={isInCart ? handleRemoveItem : handleAddItem}
            >
              {isInCart ? "Delete" : "Add to cart"}
            </Button>
          )}
        </div>
      </div>
    </li>
  );
};

export default MenuItem;
