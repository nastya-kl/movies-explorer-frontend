import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard({
  movie,
  onSaveMovie,
  onDeleteMovie,
  isSaved,
  savedMovies,
}) {
  const location = useLocation();
  const savedMoviesPath = location.pathname === "/saved-movies";
  const isLiked =
    !savedMoviesPath &&
    savedMovies.some((savedMovie) => savedMovie.movieId === movie.id);
  const saveButtonClassName = `${
    !isLiked ? "movie__button_status_inactive" : "movie__button_status_active"
  }`;

  function handleLikeButtonClick() {
    const movieInfo = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: "https://api.nomoreparties.co" + movie.image.url,
      thumbnail:
        "https://api.nomoreparties.co" + movie.image.formats.thumbnail.url,
      trailerLink: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      movieId: movie.id,
    };

    onSaveMovie(movieInfo);
  }

  function handleDeleteButtonClick() {
    onDeleteMovie(movie._id);
  }

  function setMovieDuration(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + "ч " + minutes + "м";
  }

  return (
    <li className='movie'>
      <Link to={movie.trailerLink} target='blank'>
        <img
          src={
            isSaved
              ? movie.image
              : `https://api.nomoreparties.co${movie.image.url}`
          }
          className='movie__image'
          alt={`Обложка фильма ${movie.nameRU}`}
        />
      </Link>
      <div className='movie__lower-part'>
        <h2 className='movie__title'>{movie.nameRU}</h2>
        <p className='movie__duration'>{setMovieDuration(movie.duration)}</p>
        <button
          className={`movie__button ${
            !savedMoviesPath ? saveButtonClassName : "movie__delete-button"
          }`}
          onClick={
            savedMoviesPath ? handleDeleteButtonClick : handleLikeButtonClick
          }
        ></button>
      </div>
    </li>
  );
}

export default MoviesCard;
