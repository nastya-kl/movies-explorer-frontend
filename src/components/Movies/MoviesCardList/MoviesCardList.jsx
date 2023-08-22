import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from '../Preloader/Preloader';

function MoviesCardList({ movies, onSaveMovie, onDeleteMovie, isSaved, savedMovies, isLoading }) {
  const location = useLocation();

  const [showedMovies, setShowedMovies] = React.useState([]);
  const [amountOfMovies, setAmountOfMovies] = React.useState(0);
  const [moreMovies, setMoreMovies] = React.useState(0);

  function handleRenderingMovies() {
    if (window.innerWidth ) {

    }
  }

  return (
    <section className='movies-list' aria-label='Секция с фильмами'>
      {isLoading && <Preloader />}
      {movies.length === 0 && !isLoading && (
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
