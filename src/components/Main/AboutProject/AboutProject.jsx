import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section className='project' aria-label='Секция с информацией о проекте'>
      <div className='project__container'>
        <h2 className='project__heading'>О проекте</h2>
        <ul className='project__description-container'>
          <li>
            <h3 className='project__description-heading'>
              Дипломный проект включал 5 этапов
            </h3>
            <p className='project__description'>
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </li>
          <li>
            <h3 className='project__description-heading'>
              На выполнение диплома ушло 5 недель
            </h3>
            <p className='project__description'>
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <ul className='project__duration'>
          <li className='project__week'>1 неделя</li>
          <li className='project__week'>4 недели</li>
          <li className='project__specialization'>Back-end</li>
          <li className='project__specialization'>Front-end</li>
        </ul>
      </div>
    </section>
  );
}

export default AboutProject;
