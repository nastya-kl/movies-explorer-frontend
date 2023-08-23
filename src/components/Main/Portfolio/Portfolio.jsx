import React from "react";
import "./Portfolio.css";

function Portfolio() {
  return (
    <section className='portfolio section' aria-label='Секция с портфолио'>
      <nav className='portfolio__container'>
        <h3 className='portfolio__heading'>Портфолио</h3>
        <ul>
          <li className='portfolio__link'>
            <a
              className='portfolio__text'
              href="https://github.com/nastya-kl/how-to-learn"
              target='_blank'
              rel='noopener noreferrer'
            >
              Статичный сайт <div className='portfolio__arrow'></div>
            </a>
          </li>
          <li className='portfolio__link'>
            <a
              className='portfolio__text'
              href='https://nastya-kl.github.io/russian-travel/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Адаптивный сайт <div className='portfolio__arrow'></div>
            </a>
          </li>
          <li className='portfolio__link'>
            <a
              className='portfolio__text'
              href='https://github.com/nastya-kl/react-mesto-api-full-gha'
              target='_blank'
              rel='noopener noreferrer'
            >
              Одностраничное приложение <div className='portfolio__arrow'></div>
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default Portfolio;
