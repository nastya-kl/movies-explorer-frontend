import React from "react";
import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Main({ movies, setMovies }) {
  const [value, setValue] = React.useState("");

  const filteredMovies = movies.filter(movie => {
    return movie.nameRU.toLowerCase().includes(value.toLowerCase())
  })

  return (
    <main className='movies'>
      <SearchForm movies={movies} setMovies={setMovies} value={value} setValue={setValue}/>
      <MoviesCardList movies={movies} filteredMovies={filteredMovies}/>
    </main>
  );
}

export default Main;
