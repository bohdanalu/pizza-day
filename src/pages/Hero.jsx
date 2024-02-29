import Form from "../components/Form/Form";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import ModalWindow from "../components/ModalWindow/ModalWindow";

const Hero = () => {
  const { setUser } = useContext(UserContext);

  const [inputName, setInputName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputName.trim()) {
      setIsOpen(true);
    } else {
      setUser(inputName);
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
      <Form className="login-form" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Your full name"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
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
