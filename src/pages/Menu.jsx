import { useEffect, useState } from "react";
import MenuList from "../components/Menu/MenuList/MenuList";
import { API_URL_MENU } from "../helpers/constants";
import styles from "../components/Menu/Menu.module.css";

const Menu = () => {
  const [menuList, setMenuList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(API_URL_MENU);
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
    getData();
  }, []);

  return (
    <section className={styles.menu__section}>
      <h2
        style={{
          fontSize: "40px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        Menu
      </h2>
      {loading && <p>Loading..</p>}
      {menuList.length > 0 && <MenuList menuList={menuList} />}
      {error && <div>Error: {error}</div>}
    </section>
  );
};

export default Menu;
