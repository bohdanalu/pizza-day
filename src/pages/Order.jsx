import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import userSchema from "../userSchema";
import { UserContext } from "../providers/UserProvider";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import styles from "./Order.module.css";

const Order = () => {
  const { user } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user || "",
      phoneNumber: "",
      address: "",
    },
    resolver: yupResolver(userSchema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <div className={styles.order__section}>
      <h2 className="title">Ready to order, let's go!</h2>
      <form className={styles.order__form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          name="firstName"
          label="First Name"
          register={register}
          errors={errors}
        />
        <Input
          register={register}
          errors={errors}
          type="tel"
          name="phoneNumber"
          label="Phone Number"
        />
        <Input
          register={register}
          errors={errors}
          type="text"
          name="address"
          label="Address"
        />
        <Input append="Do you want to prioritize your order?" type="checkbox" />
        <Button type="submit">
          <span className={styles.order__btn}>Order now for</span>
          <span className={styles.order__btn}></span>
        </Button>
      </form>
    </div>
  );
};

export default Order;
