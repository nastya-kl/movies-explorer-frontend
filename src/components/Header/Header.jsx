import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const location = useLocation();

  return (
    <header
      className={`header ${
        location.pathname === "/" ? "header_color_blue" : "header_color_gray"
      }`}
    >
      <div className='header__container'>
        <Link className='header__logo' to="/"></Link>

        {location.pathname === "/" ? (
          <div className='header__authorization-container'>
            <Link to="/sign-up" className='header__registration'>Регистрация</Link>
            <Link to="/sign-in"className='header__login-button'>Войти</Link>
          </div>
        ) : (
          <>
            <div className='header__movies-container'>
              <Link to="/movies" className='header__all-movies'>Фильмы</Link>
              <Link to="/saved-movies" className='header__saved-movies'>Сохранённые фильмы</Link>
            </div>
            <div className='header__account-container'>
              <Link to="/profile" className='header__account'>Аккаунт<div className='header__account-logo'></div></Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
