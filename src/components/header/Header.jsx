import { useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import { CartContext } from "../../providers/CartProvider";
import Input from "../Input/Input";
import Form from "../Form/Form";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";

import styles from "./Header.module.css";

const Header = () => {
  const { user } = useContext(UserContext);
  const { state } = useContext(CartContext);
  const navigate = useNavigate();

  const handleDirect = () => {
    if (!user) {
      navigate("/");
    } else {
      navigate("/cart");
    }
  };

  return (
    <div className={styles.header}>
      <Link to="/" className={styles.logo}>
        Pizza Day
      </Link>
      <nav className={styles.header__nav}>
        <ul className={styles.header__menu}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/menu">Menu</NavLink>
          </li>
        </ul>
      </nav>

      <Form>
        <Input placeholder="Search for the order #" />
      </Form>
      <div className={styles.header__wrap}>
        {state.cartItems.length > 0 && (
          <button className={styles.header__cart} onClick={handleDirect}>
            <FontAwesomeIcon
              className={styles.header__icon}
              icon={faBasketShopping}
            />
            <span className={styles.header__badge}>{state.totalItems}</span>
          </button>
        )}

        {user && <span className={styles.header__user}>{user}</span>}
      </div>
    </div>
  );
};

export default Header;
