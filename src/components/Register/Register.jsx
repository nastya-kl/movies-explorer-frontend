import React from "react";
import { useNavigate } from "react-router-dom";
import ValidateForm from "../../hooks/ValidateForm";
import AuthForm from "../AuthForm/AuthForm";

function Register() {
  const {
    values,
    handleChange,
    setValues,
    errors,
    isFormValid,
    inputValidation,
  } = ValidateForm({});
  const { name, email, password } = values;
  const navigate = useNavigate();

  React.useEffect(() => {
    setValues({
      name: "Виталий",
      email: "pochta@yandex.ru",
      password: "12345678912345",
    });
  }, [setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/signin", { replace: true });
  }

  return (
    <AuthForm
      title='Добро пожаловать!'
      isLoggedText='Уже зарегистрированы?'
      authPath='/signin'
      authWay='Войти'
    >
      <form className='auth__form' onSubmit={handleSubmit} noValidate>
        <div className='auth__inputs-container'>
          <label htmlFor='name' className='auth__label'>
            Имя
          </label>
          <input
            type='text'
            id='name'
            className={`auth__input ${
              !inputValidation.name ? "auth__input_color_red" : ""
            }`}
            name='name'
            value={name || ""}
            onChange={handleChange}
            errors={errors}
            required
          />
          <span className='input__error'>{errors.name}</span>
          <label htmlFor='email' className='auth__label'>
            E-mail
          </label>
          <input
            type='email'
            id='email'
            className={`auth__input ${
              !inputValidation.email ? "auth__input_color_red" : ""
            }`}
            name='email'
            value={email || ""}
            onChange={handleChange}
            errors={errors}
            required
          />
          <span className='input__error'>{errors.email}</span>
          <label htmlFor='password' className='auth__label'>
            Пароль
          </label>
          <input
            type='password'
            id='password'
            className={`auth__input ${
              !inputValidation.password ? "auth__input_color_red" : ""
            }`}
            name='password'
            value={password || ""}
            onChange={handleChange}
            errors={errors}
            required
          />
        </div>
        <span className='input__error'>{errors.password}</span>
        <button
          className={`${!isFormValid ? "button__disabled" : "auth__button"}`}
          type='submit'
          disabled={!isFormValid}
        >
          Зарегистрироваться
        </button>
      </form>
    </AuthForm>
  );
}

export default Register;
