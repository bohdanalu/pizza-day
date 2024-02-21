import MenuItem from "../MenuItem/MenuItem";
import styles from "./MenuList.module.css";

const MenuList = ({ menuList }) => {
  if (!menuList) {
    return <div>Menu not found</div>;
  }

  return (
    <ul className={styles.pizza__list}>
      {menuList.map((pizzaItem) => (
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
