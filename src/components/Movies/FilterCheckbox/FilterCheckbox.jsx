import React from "react";
import './FilterCheckbox.css'

function FilterCheckbox() {
  return (
    <section className="filter-checkbox">
      <div className="filter-checkbox__container">
        <input id="switch" type="checkbox" className="filter-checkbox__invisible-switcher" />
        <label htmlFor="switch" className="filter-checkbox__visible-switcher"></label> 
        <p className="filter-checkbox__text">Короткометражки</p>
      </div>
    </section>
  )
};

export default FilterCheckbox;