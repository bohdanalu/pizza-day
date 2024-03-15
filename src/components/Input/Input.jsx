import { useController } from "react-hook-form";
import styles from "./Input.module.css";

const Input = ({ type, name, label, placeholder, append, control }) => {
  if (!control) {
    return null;
  }
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <label className={styles.input__label}>
      {label && <span className={styles.input__labelName}>{label}</span>}
      {type === "checkbox" ? (
        <>
          <input className={styles.input__inputCheckbox} type={type} />
          {append && <span className={styles.input__append}>{append}</span>}
        </>
      ) : (
        <div className={styles.input__wrap}>
          <input
            className={styles.input__input}
            type={type}
            placeholder={placeholder}
            {...field}
          />
          {error && (
            <p className={styles.input__error}>{`* ${error.message}`}</p>
          )}
        </div>
      )}
    </label>
  );
};

export default Input;
