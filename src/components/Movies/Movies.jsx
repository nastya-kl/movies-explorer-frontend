import React from "react";
import SearchForm from "./SearchForm/SearchForm";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Main() {
  return (
    <div className="movies">
      <SearchForm />
      <FilterCheckbox />
      <MoviesCardList />
    </div>
  )
}

export default Main;