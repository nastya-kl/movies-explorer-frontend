import React from "react";

function useValidateForm() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isFormValid, setIsFormValid] = React.useState(true);
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
