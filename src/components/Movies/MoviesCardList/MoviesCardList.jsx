import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { moviesList, savedMoviesList } from "../../../utils/constants";

function MoviesCardList() {
  const location = useLocation();

  return (
    <section className='movies-list'>
      {location.pathname === "/movies" ? (
        <>
          <ul className='movies-list__container'>
            {moviesList.map((movie, i) => (
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
