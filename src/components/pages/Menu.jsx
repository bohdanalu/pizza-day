import MenuList from "../Menu/MenuList/MenuList";
import { useEffect, useState } from "react";
import { API_URL } from "../../helpers/constants";

const Menu = () => {
  const [menuList, setMenuList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
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
    getData();
  }, []);

  return (
    <section style={{ padding: "30px 0" }}>
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
