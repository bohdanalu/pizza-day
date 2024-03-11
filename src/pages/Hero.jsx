import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userNameSchema } from "../userSchema";
import { UserContext } from "../providers/UserProvider";

const Hero = () => {
  const { setUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
    },
    resolver: yupResolver(userNameSchema),
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (data.firstName.trim() !== "") {
      setUser(data.firstName);
      navigate("/menu");
    }
  };

  return (
    <div className="wrapper">
      <h1 className="title">
        The best pizza.
        <br />
        <span className="text-yellow">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      <p className="sub-title">
        👋 Welcome! Please start by telling us your name:
      </p>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Your full name"
          name="firstName"
          register={register}
          errors={errors}
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Hero;
