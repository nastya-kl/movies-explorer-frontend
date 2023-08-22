import React from "react";
import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Main({ movies, setMovies, onSearchMovies, onChecked, onSaveMovie, savedMovies, isLoading, handleOpenInfoToolTip }) {

  return (
    <main className='movies'>
      <SearchForm onSearchMovies={onSearchMovies} movies={movies} setMovies={setMovies} onChecked={onChecked} handleOpenInfoToolTip={handleOpenInfoToolTip} />
      <MoviesCardList movies={movies} onSaveMovie={onSaveMovie} savedMovies={savedMovies} isLoading={isLoading} />
    </main>
  );
}

export default Main;
