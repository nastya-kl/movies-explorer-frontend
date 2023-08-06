import React from "react";
import "./MoviesCard.css";

function MoviesCard(props) {
  const [isLiked, setIsLiked] = React.useState(false);

  const saveButtonClassName = `movie__save-button ${!isLiked ? 'movie__save-button_status_inactive' : 'movie__save-button_status_active'}`

  function handleButtonClick() {
    if (saveButtonClassName.includes('movie__save-button_status_inactive')) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
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
        <button className={saveButtonClassName} onClick={handleButtonClick}></button>
      </div>
    </li>
  );
}

export default MoviesCard;
