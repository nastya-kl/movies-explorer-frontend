import React from "react";
const regEmail = RegExp(/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/);

function useValidateForm() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [inputValidation, setinputValidation] = React.useState({
    name: true,
    email: true,
    password: true,
  });

  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: event.target.validationMessage });
    setIsFormValid(event.target.form.checkValidity());
    setinputValidation({
      ...inputValidation,
      [name]: event.target.checkValidity(),
    });

    if (
      !regEmail.test(event.target.form.querySelector("#email").value) &&
      event.target.id === "email"
    ) {
      setIsFormValid(false);
      setinputValidation({ ...inputValidation, email: false });
      setErrors({ email: "Неверный формат почты" });
    }
  };

  return {
    values,
    errors,
    isFormValid,
    setIsFormValid,
    handleChange,
    setValues,
    inputValidation,
  };
}

export default useValidateForm;
