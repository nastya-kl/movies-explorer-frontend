import React from "react";
import "./InfoToolTip.css";
import useClosedByEsc from "../../hooks/useCloseByEsc";

function InfoToolTip({ title, isOpen, isCorrect, onClose }) {
  useClosedByEsc({ isOpen, onClose });

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`tool-tip ${isOpen ? "tool-tip_visibility_true" : ""}`}
      onMouseDown={handleOverlay}
    >
      <div className='tool-tip__container'>
        <div
          className={`tool-tip__icon ${
            isCorrect
              ? "tool-tip__icon_type_success"
              : "tool-tip__icon_type_not-success"
          }`}
        ></div>
        <h2 className='tool-tip__title'>{title}</h2>
        <button className='tool-tip__close-button' onClick={onClose}></button>
      </div>
    </div>
  );
}

export default InfoToolTip;
