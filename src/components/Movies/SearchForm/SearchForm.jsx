import React from "react";
import './SearchForm.css';

function SearchForm() {
  return (
    <section className="search-form">
      <form className="search-form__container">
        <input placeholder="Фильм" type="text" className="search-form__input" />
        <button className="search-form__button">Найти</button>
      </form>
    </section>
  )
};

export default SearchForm;