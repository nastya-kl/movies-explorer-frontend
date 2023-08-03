import React from "react";
import './AboutProject.css';

function AboutProject() {
  return (
    <section className="project">
        <div className="project__container">
          <h2 className="project__heading">О проекте</h2>
          <div className="project__description-container">
            <h3 className="project__description-heading">Дипломный проект включал 5 этапов</h3>
            <h3 className="project__description-heading">На выполнение диплома ушло 5 недель</h3>
            <p className="project__description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            <p className="project__description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
          <div className="project__duration">
            <p className="project__week">1 неделя</p>
            <p className="project__week">4 недели</p>
            <p className="project__specialization">Back-end</p>
            <p className="project__specialization">Front-end</p>
          </div>
        </div>
      </section>
  )
};

export default AboutProject;