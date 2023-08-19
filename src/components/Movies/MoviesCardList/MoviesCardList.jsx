import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies }) {
  const location = useLocation();

  return (
    <section className='movies-list' aria-label='Секция с фильмами'>
      {movies.length === 0 && (
        <h2 className='movies-list__empty-text'>Ничего не найдено</h2>
      )}
      {location.pathname === "/movies" ? (
        <>
          <ul className='movies-list__container'>
            {movies.map((movie, i) => (
              <MoviesCard key={i} movie={movie} />
            ))}
          </ul>
          {movies.length !== 0 && (
            <button className='movies-list__show-more-btn'>Ещё</button>
          )}
        </>
      ) : (
        <ul className='movies-list__container'>
          {movies.map((movie, i) => (
            <MoviesCard key={i} movie={movie} />
          ))}
        </ul>
      )}
    </section>
  );
}

export default MoviesCardList;
