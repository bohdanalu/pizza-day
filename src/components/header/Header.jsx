import Input from "../Input/Input";
import Form from "../Form/Form";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
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
    </div>
  );
};

export default Header;
