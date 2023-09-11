import React from "react";
import { Link } from "react-router-dom";
import studentPnoto from "../../../images/student-photo.png";
import "./AboutMe.css";

function AboutMe() {
  return (
    <section
      className='section student'
      aria-label='Секция с информацией о студенте'
    >
      <div className='student__container'>
        <h2 className='section__heading'>Студент</h2>
        <div className='student__info-container'>
          <div className='student__text-info'>
            <h3 className='student__name'>Анастасия</h3>
            <p className='student__info'>Фронтенд-разработчик, 25 лет</p>
            <p className='student__about'>
              Родилась в Иркутске, в настоящее время живу в Санкт-Петербурге.
              Закончила Университет Гражданской Авиации и в октябре 2022 года
              начала обучаться на курсе от Яндекс.Практикума по веб-разработке.
              Планирую в дальнейшем развиваться в сфере IT.
            </p>
            <Link
              className='student__link'
              to='https://github.com/nastya-kl'
              target='blank'
              
            >
              Github
            </Link>
          </div>
          <img
            className='student__photo'
            src={studentPnoto}
            alt='Фото студента'
          />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
