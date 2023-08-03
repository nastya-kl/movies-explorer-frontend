import React from "react";
import { Link } from "react-router-dom";
import "./AboutMe.css";

function AboutMe() {
  return (
    <section className='student'>
      <div className='student__container'>
        <h2 className='project__heading'>Студент</h2>
        <div className='student__info-container'>
          <div className='student__text-info'>
            <h3 className='student__name'>Анастасия</h3>
            <p className='student__info'>Фронтенд-разработчик, 25 лет</p>
            <p className='student__about'>
              Родилась в Иркутске, переехала в 2016 году в Санкт-Петербург. В
              сентябре 2022 года начала обучение в Яндекс.Практикуме на курсе
              «Веб-разработка». Планирую развиваться в этом направлении. Люблю
              читать, заниматься спортом и открывать для себя что-то новое.
            </p>
            <Link
              className='student__link'
              to='https://github.com/nastya-kl'
              target='blank'
            >
              Github
            </Link>
          </div>
          <div className='student__photo'></div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
