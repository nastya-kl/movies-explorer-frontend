import React from "react";
import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Main({ movies, setMovies, onSearchMovies, onSaveMovie, savedMovies }) {

  return (
    <main className='movies'>
      <SearchForm onSearchMovies={onSearchMovies} setMovies={setMovies}/>
      <MoviesCardList movies={movies} onSaveMovie={onSaveMovie} savedMovies={savedMovies} />
    </main>
  );
}

export default Main;
