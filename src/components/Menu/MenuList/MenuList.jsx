import pizzas from "../../../data/data";
import MenuItem from "../MenuItem/MenuItem";
import styles from "./MenuList.module.css";

const MenuList = () => {
  return (
    <ul className={styles.pizza__list}>
      {pizzas.map((pizzaItem) => (
        <MenuItem
          menuItem={pizzaItem}
          key={pizzaItem.id}
          id={pizzaItem.id}
          img={pizzaItem.imageUrl}
          title={pizzaItem.name}
          ingredients={pizzaItem.ingredients}
          price={pizzaItem.unitPrice}
          soldOut={pizzaItem.soldOut}
        />
      ))}
    </ul>
  );
};

export default MenuList;
