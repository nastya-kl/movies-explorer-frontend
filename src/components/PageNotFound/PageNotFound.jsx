import React from "react";
import { useNavigate } from "react-router-dom";
import "./PageNotFound.css";

function PageNotFound({ setIsPageNotFoundOpen }) {
  const navigate = useNavigate();

  React.useEffect(() => {
    setIsPageNotFoundOpen(true);
  }, [setIsPageNotFoundOpen]);

  function goToPreviousPage() {
    navigate(-1);
    setIsPageNotFoundOpen(false);
  }

  return (
    <main className='not-found-page'>
      <h1 className='not-found-page__heading'>404</h1>
      <p className='not-found-page__text'>Страница не найдена</p>
      <button className='not-found-page__button' onClick={goToPreviousPage}>
        Назад
      </button>
    </main>
  );
}

export default PageNotFound;
