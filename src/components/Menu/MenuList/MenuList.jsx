import { useEffect, useState } from "react";
import MenuItem from "../MenuItem/MenuItem";
import { API_URL } from "../../../helpers/constants";
import styles from "./MenuList.module.css";

const MenuList = () => {
  const [menuList, setMenuList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDate = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch menu");
        }
        const { data } = await response.json();
        setMenuList(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getDate();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
