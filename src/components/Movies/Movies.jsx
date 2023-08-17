import React from "react";
import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Main() {
  return (
    <main className='movies'>
      <SearchForm />
      <MoviesCardList />
    </main>
  );
}

export default Main;
