import * as yup from "yup";

const phoneRegExp = /^\+\d{1,12}$/;

const userSchema = yup.object({
  firstName: yup
    .string()
    .min(3, "Name must be at least 3 symbols")
    .required("First name is required"),

  address: yup
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(100, "Address must be at most 100 characters")
    .required("Address is required"),

  phoneNumber: yup
    .string()
    .test(
      "phone-validation",
      "Enter your phone number",
      function checkPhone(value) {
        if (!value.startsWith("+"))
          return this.createError({
            message: "The phone number must start with +",
            path: this.path,
          });
        if (!phoneRegExp.test(value))
          return this.createError({
            message: "Enter a valid phone number",
            path: this.path,
          });
        if (value.length !== 13)
          return this.createError({
            message: "Enter a valid phone number",
            path: this.path,
          });
        return true;
      }
    )
    .required("Phone number is required"),
});

export default userSchema;
