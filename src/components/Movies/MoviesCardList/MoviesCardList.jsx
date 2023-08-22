import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import useRenderMovies from "../../../hooks/useRenderMovies";

function MoviesCardList({
  movies,
  onSaveMovie,
  onDeleteMovie,
  isSaved,
  savedMovies,
  isLoading,
}) {
  const location = useLocation();

  const { amountOfMovies, handleShowMoreBtnClick, isShowMoreBtnVisible } = useRenderMovies({ movies });

  return (
    <section className='movies-list' aria-label='Секция с фильмами'>
      {isLoading && <Preloader />}
      {movies.length === 0 && !isLoading && (
        <h2 className='movies-list__empty-text'>Ничего не найдено</h2>
      )}
      <ul className='movies-list__container'>
        {movies.map((movie, i) => (
          i < amountOfMovies && (
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
      </ul>
      {isShowMoreBtnVisible && location.pathname === "/movies" && (
        <button className='movies-list__show-more-btn' onClick={handleShowMoreBtnClick}>Ещё</button>
      )}
    </section>
  );
}

export default MoviesCardList;
