import React from "react";
import "./SavedMovies.css";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

function SavedMovies({ movies, filteredSavedMovies, onDeleteMovie, onSearchSavedMovies, setSavedMovies, onChecked }) {

  return (
    <main className='saved-movies'>
      <SearchForm onSearchSavedMovies={onSearchSavedMovies} setSavedMovies={setSavedMovies} onChecked={onChecked} movies={movies} />
      <MoviesCardList movies={filteredSavedMovies.length === 0 ? movies : filteredSavedMovies} isSaved onDeleteMovie={onDeleteMovie} />
    </main>
  );
}

export default SavedMovies;
