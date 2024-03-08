import styles from "./Input.module.css";

const Input = ({
  errors,
  type,
  name,
  label,
  placeholder,
  append,
  register,
}) => {
  return (
    <label className={styles.input__label} htmlFor={name}>
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
            // {...register(name)} - зустрічала багато в коді, а в мене не працює. Why?
            {...(register && register(name))}
          />
          {errors && errors[name] && (
            <p className={styles.input__error}>{`* ${errors[name].message}`}</p>
          )}
        </div>
      )}
    </label>
  );
};

export default Input;
