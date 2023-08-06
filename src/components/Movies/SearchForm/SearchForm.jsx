import React from "react";
import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <section className="search-form">
      <form className="search-form__container">
        <input placeholder="Фильм" type="text" className="search-form__input" />
        <button className="search-form__button">Найти</button>
      </form>
      <FilterCheckbox />
    </section>
  )
};

export default SearchForm;