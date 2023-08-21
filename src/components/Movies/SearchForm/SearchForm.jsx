import React from "react";
import { useLocation } from "react-router-dom";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ onSearchMovies, onSearchSavedMovies, setMovies, setSavedMovies }) {
  const [value, setValue] = React.useState("");
  const location = useLocation();
  const allMoviesPath = location.pathname === '/movies'

  const handleSubmitMoviesForm = (e) => {
    e.preventDefault();
    if (value === '') {
      setMovies([]);
    } else {
      onSearchMovies(value);
    }
  };

  const handleSubmitSavedMoviesForm = (e) => {
    e.preventDefault();
    if (value === '') {
      setSavedMovies([]);
    } else {
      onSearchSavedMovies(value);
    }
  };

  return (
    <section className='search-form' aria-label='Секция с поиском фильмов'>
      <form className='search-form__container' onSubmit={allMoviesPath ? handleSubmitMoviesForm : handleSubmitSavedMoviesForm }>
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
