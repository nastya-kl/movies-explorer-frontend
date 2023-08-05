import React from "react";
import './MoviesCardList.css'
import MoviesCard from "../MoviesCard/MoviesCard";
import moviesList from "../../../utils/constants";

function MoviesCardList() {

  return (
    <section className="movies-list">
      <ul className="movies-list__container">
        {
          moviesList.map((movie, i) => (
            <MoviesCard
              key={i}
              movie={movie}
            />
          ))
        }
      <button className="movies-list__show-more-btn">
        Ещё
      </button>
      </ul>
      
    </section>
  )
}

export default MoviesCardList;