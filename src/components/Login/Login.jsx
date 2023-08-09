import React from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import AuthForm from "../AuthForm/AuthForm";
import "./Login.css";

function Login({setIsLoggedIn, isLoggedIn}) {
  const profileEmail = "pochta@yandex.ru";
  const { values, handleChange, setValues } = useForm({});
  const { email, password } = values;
  const navigate = useNavigate();

  React.useEffect(() => {
    setValues({
      email: profileEmail,
      password: "12345678912345",
    });
  }, [setValues]);

  function handleLogin() {
    setIsLoggedIn(true);
    console.log(isLoggedIn);
    navigate('/movies', { replace: true });
  }

  return (
    <AuthForm
      title='Рады видеть!'
      isLoggedText='Ещё не зарегистрированы?'
      authPath='/signup'
      authWay='Регистрация'
      setIsLoggedIn={setIsLoggedIn}
    >
      <div className='auth__inputs-container'>
        <label htmlFor='email' className='auth__label'>
          E-mail
        </label>
        <input
          type='email'
          id='email'
          className='auth__input'
          name='email'
          value={email || ""}
          onChange={handleChange}
        />
        <label htmlFor='password' className='auth__label'>
          Пароль
        </label>
        <input
          type='password'
          id='password'
          className='auth__input'
          name='password'
          value={password || ""}
          onChange={handleChange}
        />
      </div>
      <button className="auth__button" type="submit" onClick={handleLogin}>Войти</button>
    </AuthForm>
  );
}

export default Login;
