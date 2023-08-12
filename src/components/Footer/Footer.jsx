import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const location = useLocation();
  const pathName =
    location.pathname === "/profile" ||
    location.pathname === "/signin" ||
    location.pathname === "/signup";

  return (
    !pathName && (
      <footer className='footer'>
        <div className='footer__container'>
          <h2 className='footer__heading'>
            Учебный проект Яндекс.Практикум х BeatFilm.
          </h2>
          <ul className='footer__copyright-container'>
            <li className='footer__copyright'>&#169; 2023</li>
            <li className='footer__copyright'>
              <Link
                to='https://practicum.yandex.ru/'
                className='footer__link'
                target='blank'
              >
                Яндекс.Практикум
              </Link>
              <Link
                to='https://github.com/nastya-kl'
                className='footer__link'
                target='blank'
              >
                Github
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    )
  );
}

export default Footer;
