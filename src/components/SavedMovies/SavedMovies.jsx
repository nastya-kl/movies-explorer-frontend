import React from "react";
import './SavedMovies.css';
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

function SavedMovies() {
  return (
    <div className="saved-movies">
      <SearchForm />
      <MoviesCardList />
    </div>
  )
}

export default SavedMovies;