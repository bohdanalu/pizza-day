import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBasketShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { calcTotalItems } from "../../redux/slice/cartSlice";
import styles from "./Header.module.css";
import { resetOrder, searchOrder } from "../../redux/slice/orderSlice";
import ModalWindow from "../ModalWindow/ModalWindow";

const Header = () => {
  const { register, handleSubmit, reset } = useForm();
  const user = useSelector((store) => store.userName.name);
  const state = useSelector((store) => store.cart);
  const totalItems = useSelector((store) => store.cart.totalItems);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calcTotalItems());
  }, [state.cartItems, dispatch]);

  const onSubmit = async (data) => {
    const { orderId } = data;

    const actionResult = await dispatch(searchOrder(orderId));

    if (actionResult.payload.status === "success") {
      const orderData = actionResult.payload.data;
      navigate(`/order/${orderData.id}`);
    } else {
      setErrorMessage("Order not found 🙈");
      setIsOpen(true);
    }

    reset();
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    dispatch(resetOrder());
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
      {user && <span className={styles.header__user}>{user}</span>}

      <form className={styles.header__search} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles.header__searchInput}
          type="search"
          placeholder="Search for the order #"
          {...register("orderId", { required: true })}
        />
        <button className={styles.header__searchBtn} type="submit">
          <FontAwesomeIcon
            className={styles.header__iconSearch}
            icon={faMagnifyingGlass}
          />
        </button>
      </form>
      {isOpen && (
        <ModalWindow onClose={handleCloseModal}>{errorMessage}</ModalWindow>
      )}
      {state.cartItems.length > 0 && (
        <div className={styles.header__wrap}>
          <Link className={styles.header__cart} to="/cart">
            <FontAwesomeIcon
              className={styles.header__icon}
              icon={faBasketShopping}
            />
            <span className={styles.header__badge}>{totalItems}</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
