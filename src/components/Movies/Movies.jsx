import React from "react";
import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Main({ movies, setMovies, onSearchMovies, onSaveMovie, savedMovies, isLoading }) {

  return (
    <main className='movies'>
      <SearchForm onSearchMovies={onSearchMovies} setMovies={setMovies}/>
      <MoviesCardList movies={movies} onSaveMovie={onSaveMovie} savedMovies={savedMovies} isLoading={isLoading} />
    </main>
  );
}

export default Main;
