import { useContext } from "react";
import { CartContext } from "../../../providers/CartProvider";
import Button from "../../Button/Button";
import styles from "./MenuItem.module.css";

const MenuItem = ({ imageUrl, name, unitPrice, soldOut, ingredients, id }) => {
  const { state, dispatch } = useContext(CartContext);

  const handleAddItem = () => {
    dispatch({ type: "ADD_ITEM", payload: { name, unitPrice, id, imageUrl } });
  };

  const handleDeleteItem = () => {
    dispatch({
      type: "DELETE_ITEM",
      payload: { id },
    });
  };

  const handleIncrementItem = () => {
    dispatch({
      type: "INCREMENT_ITEM",
      payload: { id },
    });
  };

  const handleDecrementItem = () => {
    dispatch({
      type: "DECREMENT_ITEM",
      payload: { id },
    });
  };

  const cartItem = state.cartItems.find((item) => item.id === id);
  const cartItemQty = cartItem ? cartItem.qty : 0;

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

          <div className="btns">
            {cartItem && (
              <div>
                <Button type="button" onClick={handleIncrementItem}>
                  +
                </Button>
                <span className="qty">{cartItemQty}</span>
                <Button type="button" onClick={handleDecrementItem}>
                  -
                </Button>
              </div>
            )}
            {!soldOut && (
              <Button
                type="button"
                onClick={cartItem ? handleDeleteItem : handleAddItem}
              >
                {cartItem ? "Delete" : "Add to cart"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default MenuItem;
