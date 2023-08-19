import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ onSearchMovies, setMovies }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === '') {
      setMovies([]);
    } else {
      onSearchMovies(value);
    }
  };


  return (
    <section className='search-form' aria-label='Секция с поиском фильмов'>
      <form className='search-form__container' onSubmit={handleSubmit}>
        <input
          placeholder='Фильм'
          formAction="#"
          type='text'
          className='search-form__input'
          onChange={(e) => setValue(e.target.value)}
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
