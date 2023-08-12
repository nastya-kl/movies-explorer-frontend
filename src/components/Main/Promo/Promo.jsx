import React from "react";
import "./Promo.css";
import { Link } from "react-scroll";

function Promo() {
  return (
    <section className='promo' aria-label='Секция с промо'>
      <div className='promo__container'>
        <div className='promo__heading-container'>
          <h1 className='promo__heading'>
            Учебный проект студента факультета Веб&#8209;разработки.
          </h1>
          <p className='promo__info'>
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <Link
            to='project'
            smooth={true}
            duration={1000}
            className='promo__learn-more'
          >
            Узнать&nbsp;больше
          </Link>
        </div>
        <div className='promo__image'></div>
      </div>
    </section>
  );
}

export default Promo;
