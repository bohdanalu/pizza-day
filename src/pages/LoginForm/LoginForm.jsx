import { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../../userSchema";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { submitOrder } from "../../redux/slice/orderSlice";
import { updateUserName } from "../../redux/slice/userSlice";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const user = useSelector((store) => store.userName.name);
  const cartState = useSelector((store) => store.cart);
  const { orderId, status, error, isLoading } = useSelector(
    (store) => store.order
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: user || "",
      phoneNumber: "",
      address: "",
      priority: false,
    },
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = useCallback(
    async (data) => {
      const orderData = {
        address: data.address,
        customer: data.firstName,
        phone: data.phoneNumber,
        priority: data.priority,
        position: "",
        cart: cartState.cartItems.map((item) => ({
          name: item.name,
          pizzaId: item.id,
          quantity: item.qty,
          totalPrice: item.qty * item.unitPrice,
          unitPrice: item.unitPrice,
        })),
      };

      dispatch(submitOrder(orderData));
      dispatch(updateUserName(data.firstName));
    },
    [cartState, dispatch]
  );

  useEffect(() => {
    if (status === "success" && orderId) {
      navigate(`/order/${orderId}`);
    }
  }, [status, orderId, navigate]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="section">
      <h2 className="title">Ready to login, let's go!</h2>
      <form className={styles.login__form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          name="firstName"
          label="First Name"
          control={control}
        />
        <Input
          type="tel"
          name="phoneNumber"
          label="Phone Number"
          control={control}
        />
        <Input type="text" name="address" label="Address" control={control} />
        <Input
          append="Do you want to prioritize your login?"
          name="priority"
          type="checkbox"
          control={control}
        />
        <Button type="submit">
          <span className={styles.login__btn}>Order now for</span>
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
