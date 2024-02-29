import { useContext } from "react";
import { CartContext } from "../../../providers/CartProvider";
import Button from "../../Button/Button";
import styles from "./MenuItem.module.css";

const MenuItem = ({ imageUrl, name, unitPrice, soldOut, ingredients, id }) => {
  const { dispatch } = useContext(CartContext);

  const handleAddItem = () => {
    dispatch({ type: "ADD_ITEM", payload: { name, unitPrice, id, imageUrl } });
  };

  return (
    <li className={styles.pizza} key={id}>
      <img className={styles.pizza__image} src={imageUrl} alt={name} />
      <div className={styles.pizza__info}>
        <h3 className={styles.pizza__name}>{name}</h3>
        <div className={styles.pizza__ingredients}>
          {ingredients.join(", ")}
        </div>
        <div className={styles.pizza__actions}>
          <p className={styles.pizza__price}>
            {soldOut ? <span>Sold out</span> : unitPrice + " \u20AC"}
          </p>
          {!soldOut && (
            <Button type="button" onClick={handleAddItem}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
};

export default MenuItem;
