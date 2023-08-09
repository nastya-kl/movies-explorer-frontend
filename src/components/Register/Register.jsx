import React from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import AuthForm from "../AuthForm/AuthForm";
import "./Register.css";

function Register() {
  const profileName = "Виталий";
  const profileEmail = "pochta@yandex.ru";
  const { values, handleChange, setValues } = useForm({});
  const { name, email, password } = values;
  const navigate = useNavigate();

  React.useEffect(() => {
    setValues({ name: profileName, email: profileEmail, password: '12345678912345' });
  }, [setValues]);

  function handleRegister() {
    navigate('/signin', { replace: true });
  }

  return (
    <AuthForm
      title='Добро пожаловать!'
      isLoggedText='Уже зарегистрированы?'
      authPath='/signin'
      authWay='Войти'
    >
      <div className='auth__inputs-container'>
        <label htmlFor='name' className='auth__label'>
          Имя
        </label>
        <input
          type='text'
          id='name'
          className='auth__input'
          name='name'
          value={name || ""}
          onChange={handleChange}
        />
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
      <button className="auth__button" type="submit" onClick={handleRegister}>Зарегистрироваться</button>
    </AuthForm>
  );
}

export default Register;
