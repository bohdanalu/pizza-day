import Button from "../../Button/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  increment,
  decrement,
  deleteItem,
} from "../../../redux/slice/cartSlice";
import styles from "./MenuItem.module.css";

const MenuItem = ({ item }) => {
  const { imageUrl, name, unitPrice, soldOut, ingredients, id } = item;
  const cartItems = useSelector((store) => store.cart.cartItems);
  const dispatch = useDispatch();

  const handleAddItem = () => {
    dispatch(addItem(item));
  };

  const handleDeleteItem = () => {
    dispatch(deleteItem(item));
  };

  const handleIncrementItem = () => {
    dispatch(increment(item));
  };

  const handleDecrementItem = () => {
    dispatch(decrement(item));
  };

  const cartItem = cartItems.find((item) => item.id === id);
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
