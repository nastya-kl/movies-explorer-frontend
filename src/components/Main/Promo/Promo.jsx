import React from "react";
import './Promo.css'

function Promo() {
  return (
    <section className="promo">
        <div className="promo__container">
          <div className="promo__heading-container">
            <h1 className="promo__heading">Учебный проект студента факультета Веб&#8209;разработки.</h1>
            <p className="promo__info">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
            <button className="promo__learn-more">Узнать&nbsp;больше</button>
          </div>
          <div className="promo__image"></div>
        </div>
      </section>
  )
}

export default Promo;