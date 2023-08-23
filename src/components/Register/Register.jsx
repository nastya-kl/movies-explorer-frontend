import React from "react";
import useValidateForm from "../../hooks/useValidateForm";
import AuthForm from "../AuthForm/AuthForm";

function Register({onRegister, isLoading}) {
  const {
    values,
    handleChange,
    errors,
    isFormValid,
    inputValidation,
  } = useValidateForm({});
  const { name, email, password } = values;

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values);
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
          {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>
    </AuthForm>
  );
}

export default Register;
