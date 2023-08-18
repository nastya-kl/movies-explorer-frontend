import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ movies, setMovies, value, setValue }) {

  const handleSubmit = (e) => {
    e.preventDefault();
    setValue(e.target.querySelector('.search-form__input').value);
  };


  return (
    <section className='search-form' aria-label='Секция с поиском фильмов'>
      <form className='search-form__container' onSubmit={handleSubmit}>
        <input
          placeholder='Фильм'
          type='text'
          className='search-form__input'
        />
        <button className='search-form__button' type='submit'>
          Найти
        </button>
      </form>
      <FilterCheckbox />
    </section>
  );
}

export default SearchForm;
