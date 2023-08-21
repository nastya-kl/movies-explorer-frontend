import React from "react";
import useValidateForm from "../../hooks/useValidateForm";
import AuthForm from "../AuthForm/AuthForm";

function Login({ setIsLoggedIn, onLogin, isLoading }) {
  const {
    values,
    handleChange,
    setValues,
    errors,
    isFormValid,
    inputValidation,
  } = useValidateForm({});
  const { email, password } = values;

  React.useEffect(() => {
    setValues({
      email: "pochta@yandex.ru",
      password: "12345678912345",
    });
  }, [setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoggedIn(true);
    onLogin(values);
  }

  return (
    <AuthForm
      title='Рады видеть!'
      isLoggedText='Ещё не зарегистрированы?'
      authPath='/signup'
      authWay='Регистрация'
    >
      <form className='auth__form' onSubmit={handleSubmit} noValidate>
        <div className='auth__inputs-container'>
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
          <span className='input__error'>{errors.password}</span>
        </div>
        <button
          className={`${!isFormValid ? "button__disabled" : "auth__button"}`}
          type='submit'
          disabled={!isFormValid}
        >
          {isLoading ? 'Выполняется вход...' : 'Войти'}
        </button>
      </form>
    </AuthForm>
  );
}

export default Login;
