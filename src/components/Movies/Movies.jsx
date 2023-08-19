import React from "react";
import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Main({ movies, setMovies, onSearchMovies }) {

  // const filteredMovies = movies.filter(movie => {
  //   return movie.nameRU.toLowerCase().includes(value.toLowerCase())
  // })

  return (
    <main className='movies'>
      <SearchForm onSearchMovies={onSearchMovies} setMovies={setMovies}/>
      <MoviesCardList movies={movies}/>
    </main>
  );
}

export default Main;
