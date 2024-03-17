import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { calcTotalItems } from "../../redux/slice/cartSlice";
import styles from "./Header.module.css";

const Header = () => {
  const user = useSelector((store) => store.userName.name);
  const state = useSelector((store) => store.cart);
  const totalItems = useSelector((store) => store.cart.totalItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calcTotalItems());
  }, [state.cartItems, dispatch]);

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
            <span className={styles.header__badge}>{totalItems}</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
