import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies, onSaveMovie, onDeleteMovie, isSaved, savedMovies }) {
  const location = useLocation();

  return (
    <section className='movies-list' aria-label='Секция с фильмами'>
      {movies.length === 0 && (
        <h2 className='movies-list__empty-text'>Ничего не найдено</h2>
      )}
      <ul className='movies-list__container'>
        {movies.map((movie) => (
          <MoviesCard
            key={movie.id ?? movie._id}
            movie={movie}
            onSaveMovie={onSaveMovie}
            onDeleteMovie={onDeleteMovie}
            isSaved={isSaved}
            savedMovies={savedMovies}
          />
        ))}
      </ul>
      {movies.length !== 0 && location.pathname === "/movies" && (
        <button className='movies-list__show-more-btn'>Ещё</button>
      )}
    </section>
  );
}

export default MoviesCardList;
