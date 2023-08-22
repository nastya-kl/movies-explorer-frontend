import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ isShort, setIsShort, value, onChecked, disabled }) {
  function toggleCheckbox(e) {
    setIsShort(e.target.checked);
    onChecked(value, e.target.checked);
  }

  return (
    <div className='filter-checkbox'>
      <div className='filter-checkbox__container'>
        <input
          id='switch'
          type='checkbox'
          className='filter-checkbox__invisible-switcher'
          onChange={(e) => toggleCheckbox(e)}
          checked={isShort}
          disabled={disabled}
        />
        <label
          htmlFor='switch'
          className={`filter-checkbox__visible-switcher ${
            disabled ? "filter-checkbox__visible-switcher_status_disabled" : ""
          }`}
        ></label>
        <p className='filter-checkbox__text'>Короткометражки</p>
      </div>
    </div>
  );
}

export default FilterCheckbox;
