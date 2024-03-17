import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../../userSchema";
import { useSelector } from "react-redux";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const user = useSelector((store) => store.userName.name);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: user || "",
      phoneNumber: "",
      address: "",
      priority: false,
    },
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className={styles.login__section}>
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
