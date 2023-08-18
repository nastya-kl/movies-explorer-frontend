import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard(props) {
  const [isLiked, setIsLiked] = React.useState(false);
  const location = useLocation();
  const savedMoviesPath = location.pathname === "/saved-movies";
  const saveButtonClassName = `${
    !isLiked
      ? "movie__button_status_inactive"
      : "movie__button_status_active"
  }`;

  function handleButtonClick() {
    setIsLiked(!isLiked);
  }

  function setMovieDuration(mins) {
    let hours = Math.trunc(mins/60);
    let minutes = mins % 60;
    return hours + 'ч ' + minutes + 'м';
  }

  return (
    <li className='movie'>
      <Link to={props.movie.trailerLink} target="blank">
        <img
          src={`https://api.nomoreparties.co${props.movie.image.url}`}
          className='movie__image'
          alt={`Обложка фильма ${props.movie.nameRU}`}
        />
      </Link>
      <div className='movie__lower-part'>
        <h2 className='movie__title'>{props.movie.nameRU}</h2>
        <p className='movie__duration'>{setMovieDuration(props.movie.duration)}</p>
        <button
          className={`movie__button ${
            !savedMoviesPath ? saveButtonClassName : "movie__delete-button"
          }`}
          onClick={handleButtonClick}
        ></button>
      </div>
    </li>
  );
}

export default MoviesCard;
