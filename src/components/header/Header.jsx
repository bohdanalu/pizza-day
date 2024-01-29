import Input from "../Input/Input";
import Form from "../Form/Form";

const Header = () => {
  return (
    <div className="header">
      <a href="/" className="logo">
        Pizza Day
      </a>
      <Form>
        <Input placeholder="Search for the order #" />
      </Form>
    </div>
  );
};

export default Header;
