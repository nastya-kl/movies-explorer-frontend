import React from "react";
import './Techs.css'

function Techs() {
  return (
    <section className="techs">
    <div className="techs__container">
      <h2 className="project__heading project__heading_margin_less">Технологии</h2>
      <h3 className="techs__heading">7 технологий</h3>
      <p className="techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="techs__examples-container">
        <li className="techs__example">HTML</li>
        <li className="techs__example">CSS</li>
        <li className="techs__example">JS</li>
        <li className="techs__example">React</li>
        <li className="techs__example">Git</li>
        <li className="techs__example">Express.js</li>
        <li className="techs__example">mongoDB</li>
      </ul>
    </div>
  </section>
  )
}

export default Techs;