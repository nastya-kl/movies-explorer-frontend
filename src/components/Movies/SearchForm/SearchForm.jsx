import React from "react";
import { useLocation } from "react-router-dom";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ onSearchMovies, movies, onSearchSavedMovies, onChecked, setMovies, setSavedMovies, handleOpenInfoToolTip}) {
  const [value, setValue] = React.useState("");
  const [isShort, setIsShort] = React.useState(false);
  const location = useLocation();
  const allMoviesPath = location.pathname === '/movies'

  const [disabled, setDisabled] = React.useState(false);

  React.useEffect(() => {
    if (movies.length === 0 && value === '') {
      setDisabled(true);
    } else if (location.pathname === '/movies' && movies.length !== 0 && value === '') {
      setDisabled(true)
    } else if (location.pathname === '/saved-movies' && movies.length !== 0 && value === '') {
      setDisabled(false)
    } else if (movies.length !== 0 && value !== '') {
      setDisabled(false)
    }
  }, [location.pathname, movies, value])

  const handleSubmitMoviesForm = (e) => {
    e.preventDefault();
    if (value === '') {
      setMovies([]);
      handleOpenInfoToolTip(true, false, 'Введите ключевое слово для поиска');
    } else {
      onSearchMovies(value, isShort);
    }
  };

  const handleSubmitSavedMoviesForm = (e) => {
    e.preventDefault();
    if (value === '') {
      setSavedMovies([]);
      handleOpenInfoToolTip(true, false, 'Введите ключевое слово для поиска');
    } else {
      onSearchSavedMovies(value, isShort);
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
      <FilterCheckbox isShort={isShort} setIsShort={setIsShort} onChecked={onChecked} value={value} disabled={disabled} />
    </section>
  );
}

export default SearchForm;
