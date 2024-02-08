import Button from "../../Button/Button";
import styles from "./MenuItem.module.css";

const MenuItem = ({ img, title, price, soldOut, ingredients }) => (
  <li className={styles.pizza}>
    <img className={styles.pizza__image} src={img} alt={title} />
    <div className={styles.pizza__info}>
      <h3 className={styles.pizza__name}>{title}</h3>
      <div className={styles.pizza__ingredients}>{ingredients.join(", ")}</div>
      <div className={styles.pizza__actions}>
        <span className={styles.pizza__price}>
          {soldOut ? <p>Sold out</p> : price + " \u20AC"}
        </span>
        {!soldOut && <Button>Add to cart</Button>}
      </div>
    </div>
  </li>
);

export default MenuItem;
