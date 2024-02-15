import MenuList from "./MenuList/MenuList";
import { useEffect, useState } from "react";
import { API_URL } from "../../helpers/constants";
import styles from "./Menu.module.css";

const Menu = () => {
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
  return (
    <section className={styles.menu__section}>
      <h2 className={styles.menu__title}>Menu</h2>
      <MenuList menuList={menuList} loading={loading} />
      {error && <div>Error: {error}</div>}
    </section>
  );
};

export default Menu;
