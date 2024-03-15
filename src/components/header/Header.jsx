import { useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import { CartContext } from "../../providers/CartProvider";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";

import styles from "./Header.module.css";

const Header = () => {
  const { user } = useContext(UserContext);
  const { state } = useContext(CartContext);

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
      {user && <span className={styles.header__user}>{user}</span>}

      <form className={styles.header__search}>
        <input type="search" placeholder="Search for the order #" />
      </form>
      <div className={styles.header__wrap}>
        {state.cartItems.length > 0 && (
          <Link className={styles.header__cart} to="/cart">
            <FontAwesomeIcon
              className={styles.header__icon}
              icon={faBasketShopping}
            />
            <span className={styles.header__badge}>{state.totalItems}</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
