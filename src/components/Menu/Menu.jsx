import MenuList from "./MenuList/MenuList";
import styles from "./Menu.module.css";

const Menu = () => {
  return (
    <section className={styles.menu__section}>
      <h2 className={styles.menu__title}>Menu</h2>
      <MenuList />
    </section>
  );
};

export default Menu;
