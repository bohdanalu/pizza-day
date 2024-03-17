import MenuItem from "../MenuItem/MenuItem";
import styles from "./MenuList.module.css";

const MenuList = ({ menuList }) => {
  if (!menuList) {
    return <div>Menu not found</div>;
  }

  return (
    <ul className={styles.pizza__list}>
      {menuList.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default MenuList;
