import Form from "../components/Form/Form";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import userSchema from "../userSchema";
import { UserContext } from "../providers/UserProvider";
import ModalWindow from "../components/ModalWindow/ModalWindow";

const Hero = () => {
  const { setUser, user } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
    },
    resolver: yupResolver(userSchema),
  });

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const onSubmit = (data, e) => {
    e.preventDefault();

    if (data.firstName.trim()) {
      setUser(data.firstName);
      console.log(user);
    } else {
      setIsOpen(true);
      console.error("Please enter your name");
    }

    navigate("/menu");
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
      {/* onSubmit don't work */}
      <Form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Your full name"
          name="firstName"
          register={register}
          errors={errors}
        />
        <Button type="submit">Login</Button>
      </Form>
      {isOpen && (
        <ModalWindow onClose={handleCloseModal}>
          <p>
            👋 Please register <br /> before accessing the menu.
          </p>
        </ModalWindow>
      )}
    </div>
  );
};

export default Hero;
