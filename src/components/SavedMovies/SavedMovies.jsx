import React from "react";
import "./SavedMovies.css";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

function SavedMovies({ movies, onDeleteMovie }) {
  return (
    <main className='saved-movies'>
      <SearchForm />
      <MoviesCardList movies={movies} isSaved onDeleteMovie={onDeleteMovie} />
    </main>
  );
}

export default SavedMovies;
