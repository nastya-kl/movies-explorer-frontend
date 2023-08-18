import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { savedMoviesList } from "../../../utils/constants";

function MoviesCardList({ movies, filteredMovies }) {
  const location = useLocation();

  return (
    <section className='movies-list' aria-label='Секция с фильмами'>
      {location.pathname === "/movies" ? (
        <>
          <ul className='movies-list__container'>
            {filteredMovies.map((movie, i) => (
              <MoviesCard key={i} movie={movie} />
            ))}
          </ul>
          <button className='movies-list__show-more-btn'>Ещё</button>
        </>
      ) : (
        <ul className='movies-list__container'>
          {savedMoviesList.map((movie, i) => (
            <MoviesCard key={i} movie={movie} />
          ))}
        </ul>
      )}
    </section>
  );
}

export default MoviesCardList;
