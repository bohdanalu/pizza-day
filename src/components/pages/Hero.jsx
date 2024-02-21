import Form from "../Form/Form";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalWindow from "../ModalWindow/ModalWindow";

const Hero = () => {
  const [userName, setUserName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(userName);
    if (!userName) {
      setIsOpen(true);
    }
    if (userName) {
      navigate("/menu");
    }

    setUserName("");
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
      <Form className="login-form" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Your full name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <Button type="submit">Login</Button>
      </Form>
      {isOpen && (
        <ModalWindow onClose={handleCloseModal}>
          <p>
            👋 Зареєструйтеся, <br /> будь ласка, <br /> перш ніж перейти до
            меню
          </p>
        </ModalWindow>
      )}
    </div>
  );
};

export default Hero;
