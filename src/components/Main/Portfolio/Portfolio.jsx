import React from "react";
import { Link } from "react-router-dom";
import "./Portfolio.css";

function Portfolio() {
  return (
    <section className='portfolio'>
      <div className='portfolio__container'>
        <ul className='portfolio__heading'>
          Портфолио
          <li className='portfolio__link'>
            <Link
              className='portfolio__text'
              to='https://github.com/nastya-kl/how-to-learn'
              target='blank'
            >
              Статичный сайт <div className='portfolio__arrow'></div>
            </Link>
          </li>
          <li className='portfolio__link'>
            <Link
              className='portfolio__text'
              to='https://nastya-kl.github.io/russian-travel/'
              target='blank'
            >
              Адаптивный сайт <div className='portfolio__arrow'></div>
            </Link>
          </li>
          <li className='portfolio__link'>
            <Link
              className='portfolio__text'
              to='https://mesto.nastya-kll.nomoreparties.sbs'
              target='blank'
            >
              Одностраничное приложение <div className='portfolio__arrow'></div>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
