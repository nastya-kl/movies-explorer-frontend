import React from "react";
import { useLocation } from "react-router-dom";
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

  return (
    <li className='movie'>
      <img
        src={props.movie.image}
        className='movie__image'
        alt={`Обложка фильма ${props.movie.title}`}
      />
      <div className='movie__lower-part'>
        <h2 className='movie__title'>{props.movie.title}</h2>
        <p className='movie__duration'>{props.movie.duration}</p>
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
