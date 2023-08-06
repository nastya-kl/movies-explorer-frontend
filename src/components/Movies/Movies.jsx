import React from "react";
import './Movies.css'
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Main() {
  return (
    <div className="movies">
      <SearchForm />
      <MoviesCardList />
    </div>
  )
}

export default Main;