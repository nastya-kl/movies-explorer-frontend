import React from "react";
import { Link } from "react-router-dom";
import studentPnoto from "../../../images/student-photo.png";
import "./AboutMe.css";

function AboutMe() {
  return (
    <section className='student'>
      <div className='student__container'>
        <h2 className='project__heading'>Студент</h2>
        <div className='student__info-container'>
          <div className='student__text-info'>
            <h3 className='student__name'>Виталий</h3>
            <p className='student__info'>Фронтенд-разработчик, 30 лет</p>
            <p className='student__about'>
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У
              меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
              бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
              Контур». После того, как прошёл курс по веб-разработке, начал
              заниматься фриланс-заказами и ушёл с постоянной работы.
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
