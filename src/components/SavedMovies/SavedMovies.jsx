import React from "react";
import "./SavedMovies.css";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

function SavedMovies({
  movies,
  filteredSavedMovies,
  onDeleteMovie,
  onSearchSavedMovies,
  setSavedMovies,
  onChecked,
  handleOpenInfoToolTip,
  pageText,
  setPageText
}) {
  return (
    <main className='saved-movies'>
      <SearchForm
        onSearchSavedMovies={onSearchSavedMovies}
        setSavedMovies={setSavedMovies}
        onChecked={onChecked}
        movies={movies}
        handleOpenInfoToolTip={handleOpenInfoToolTip}
        setText={setPageText}
      />
      <MoviesCardList
        movies={filteredSavedMovies.length === 0 ? movies : filteredSavedMovies}
        isSaved
        onDeleteMovie={onDeleteMovie}
        text={pageText}
      />
    </main>
  );
}

export default SavedMovies;
