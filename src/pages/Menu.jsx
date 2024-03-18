import { useEffect } from "react";
import MenuList from "../components/Menu/MenuList/MenuList";
import styles from "../components/Menu/Menu.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllItemsMenu } from "../redux/slice/menuSlice";

const Menu = () => {
  const state = useSelector((store) => store.menu);
  const { menuItems, isLoading, error } = state;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllItemsMenu());
  }, [dispatch]);

  return (
    <section className="section">
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
      {isLoading && <p>Loading..</p>}
      {menuItems.length > 0 && <MenuList menuList={menuItems} />}
      {error && <div>Error: {error}</div>}
    </section>
  );
};

export default Menu;
