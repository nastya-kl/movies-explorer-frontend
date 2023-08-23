import React from "react";
import { useLocation } from "react-router-dom";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { toolTipMessages } from "../../../utils/constants";

function SearchForm({
  onSearchMovies,
  movies,
  onSearchSavedMovies,
  onChecked,
  setMovies,
  setSavedMovies,
  handleOpenInfoToolTip,
}) {
  const [value, setValue] = React.useState("");
  const [isShort, setIsShort] = React.useState(false);
  const location = useLocation();
  const allMoviesPath = location.pathname === "/movies";
  const savedMoviesPath = location.pathname === "/saved-movies";

  const [disabled, setDisabled] = React.useState(false);

  React.useEffect(() => {
    if (allMoviesPath && "searchMoviesHistory" in localStorage) {
      const searchMoviesHistory = JSON.parse(
        localStorage.getItem("searchMoviesHistory")
      );
      setValue(searchMoviesHistory.inputValue);
      setIsShort(searchMoviesHistory.isShort);
      setMovies(searchMoviesHistory.data);
    } else if (savedMoviesPath && "searchSavedMoviesHistory" in localStorage) {
      const searchSavedMoviesHistory = JSON.parse(
        localStorage.getItem("searchSavedMoviesHistory")
      );
      setValue(searchSavedMoviesHistory.inputValue);
      setIsShort(searchSavedMoviesHistory.isShort);
      setSavedMovies(searchSavedMoviesHistory.data);
    }
  }, [allMoviesPath, savedMoviesPath, setMovies, setSavedMovies]);

  React.useEffect(() => {
    if (movies.length === 0 && value === "") {
      setDisabled(true);
    } else if (allMoviesPath && movies.length !== 0 && value === "") {
      setDisabled(true);
    } else if (allMoviesPath && movies.length === 0 && value !== "") {
      setDisabled(false);
    } else if (savedMoviesPath && movies.length !== 0 && value === "") {
      setDisabled(false);
    } else if (movies.length !== 0 && value !== "") {
      setDisabled(false);
    }
  }, [allMoviesPath, location.pathname, movies, savedMoviesPath, value]);

  const handleSubmitMoviesForm = (e) => {
    e.preventDefault();
    if (value === "") {
      setMovies([]);
      handleOpenInfoToolTip(true, false, toolTipMessages.moviesSearchError);
    } else {
      onSearchMovies(value, isShort);
    }
  };

  const handleSubmitSavedMoviesForm = (e) => {
    e.preventDefault();
    if (value === "") {
      setSavedMovies([]);
      handleOpenInfoToolTip(true, false, toolTipMessages.moviesSearchError);
    } else {
      onSearchSavedMovies(value, isShort);
    }
  };

  return (
    <section className='search-form' aria-label='Секция с поиском фильмов'>
      <form
        className='search-form__container'
        onSubmit={
          allMoviesPath ? handleSubmitMoviesForm : handleSubmitSavedMoviesForm
        }
      >
        <input
          placeholder='Фильм'
          formAction='#'
          type='text'
          className='search-form__input'
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <button className='search-form__button' type='submit'>
          Найти
        </button>
      </form>
      <FilterCheckbox
        isShort={isShort}
        setIsShort={setIsShort}
        onChecked={onChecked}
        value={value}
        disabled={disabled}
      />
    </section>
  );
}

export default SearchForm;
