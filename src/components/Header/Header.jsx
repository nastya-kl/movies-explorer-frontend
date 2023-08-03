import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className='header'>
      <div className='header__container'>
        <div className='header__logo'></div>
        <div className='header__authorization-container'>
          <p className='header__registration'>Регистрация</p>
          <button className='header__login-button'>Войти</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
