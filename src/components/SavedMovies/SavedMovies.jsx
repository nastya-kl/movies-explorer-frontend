import React from "react";
import "./SavedMovies.css";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

function SavedMovies({ movies, filteredSavedMovies, onDeleteMovie, onSearchSavedMovies, setSavedMovies, onChecked, handleOpenInfoToolTip }) {

  return (
    <main className='saved-movies'>
      <SearchForm onSearchSavedMovies={onSearchSavedMovies} setSavedMovies={setSavedMovies} onChecked={onChecked} movies={movies} handleOpenInfoToolTip={handleOpenInfoToolTip} />
      <MoviesCardList movies={filteredSavedMovies.length === 0 ? movies : filteredSavedMovies} isSaved onDeleteMovie={onDeleteMovie} />
    </main>
  );
}

export default SavedMovies;


// eslint-disable-next-line no-lone-blocks
{/* <ul className='movies-list__container'>
        {movies.map((movie, i) => (
          location.pathname === '/movies' ? (
          i < amountOfMovies && (
            <MoviesCard
              key={movie.id ?? movie._id}
              movie={movie}
              onSaveMovie={onSaveMovie}
              onDeleteMovie={onDeleteMovie}
              isSaved={isSaved}
              savedMovies={savedMovies}
            />)
          ) : (
            <MoviesCard
              key={movie.id ?? movie._id}
              movie={movie}
              onSaveMovie={onSaveMovie}
              onDeleteMovie={onDeleteMovie}
              isSaved={isSaved}
              savedMovies={savedMovies}
            />
          )
        ))}
      </ul> */}