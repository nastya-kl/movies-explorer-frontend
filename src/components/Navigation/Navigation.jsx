import React from "react";
import "./Navigation.css";
import { useLocation, Link } from "react-router-dom";

function Navigation({isloggedIn}) {
  const location = useLocation();
  const body = document.querySelector("body");
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false);

  function handleBurgerBtnClick() {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
    body.classList.toggle("body_status_locked");
  }

  function handleMenuLinkClick() {
    body.classList.remove("body_status_locked");
    setIsBurgerMenuOpen(false);
  }

  return (
    <div className={`header__wrapper ${isBurgerMenuOpen ? "open" : ""}`}>
      {!isloggedIn ? (
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
          <button
            className={`header__burger-btn ${location.pathname === '/' && !isBurgerMenuOpen ? 'header__burger-btn_color_blue' : ''} ${isBurgerMenuOpen ? "header__burger-btn_status_open" : ""}`}
            onClick={handleBurgerBtnClick}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className='header__menu'>
            <div className='header__movies-container'>
              <Link
                to='/'
                className='header__movies header__movies_go-to_main'
                onClick={handleMenuLinkClick}
              >
                Главная
              </Link>
              <Link
                to='/movies'
                className={`header__movies ${
                  location.pathname === "/movies"
                    ? "header__movies_status_active _underlined"
                    : ""
                }`}
                onClick={handleMenuLinkClick}
              >
                Фильмы
              </Link>
              <Link
                to='/saved-movies'
                className={`header__movies ${
                  location.pathname === "/saved-movies"
                    ? "header__movies_status_active _underlined"
                    : ""
                }`}
                onClick={handleMenuLinkClick}
              >
                Сохранённые фильмы
              </Link>
            </div>
            <div className='header__account-container'>
              <Link
                to='/profile'
                className='header__account'
                onClick={handleMenuLinkClick}
              >
                Аккаунт
                <div className={`header__account-logo ${location.pathname === '/' ? 'header__account-logo_color_blue' : ''}`}></div>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Navigation;
