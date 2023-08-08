import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const location = useLocation();
  const pathName =
    location.pathname === "/signin" || location.pathname === "/signup";

  return (
    !pathName && (
      <header
        className={`header ${
          location.pathname === "/" ? "header_color_blue" : "header_color_gray"
        }`}
      >
        <div className='header__container'>
          <Link className='header__logo' to='/'></Link>

          {location.pathname === "/" ? (
            <div className='header__authorization-container'>
              <Link to='/signup' className='header__registration'>
                Регистрация
              </Link>
              <Link to='/signin' className='header__login-button'>
                Войти
              </Link>
            </div>
          ) : (
            <>
              <div className='header__movies-container'>
                <Link
                  to='/movies'
                  className={`header__movies ${
                    location.pathname === "/movies"
                      ? "header__movies_status_active"
                      : ""
                  }`}
                >
                  Фильмы
                </Link>
                <Link
                  to='/saved-movies'
                  className={`header__movies ${
                    location.pathname === "/saved-movies"
                      ? "header__movies_status_active"
                      : ""
                  }`}
                >
                  Сохранённые фильмы
                </Link>
              </div>
              <div className='header__account-container'>
                <Link to='/profile' className='header__account'>
                  Аккаунт<div className='header__account-logo'></div>
                </Link>
              </div>
            </>
          )}
        </div>
      </header>
    )
  );
}

export default Header;
