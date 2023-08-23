import React from "react";
import { useLocation } from "react-router-dom";
import { windowInnerWidth } from "../utils/constants";

function useRenderMovies({ movies }) {
  const [amountOfMovies, setAmountOfMovies] = React.useState(0);
  const [moreMovies, setMoreMovies] = React.useState(0);
  const [isShowMoreBtnVisible, setIsShowMoreBtnVisible] = React.useState(false);

  const location = useLocation();

  function handleRenderingMovies() {
    if (location.pathname === "/movies") {
      if (window.innerWidth <= windowInnerWidth.mobile) {
        setAmountOfMovies(5);
        setMoreMovies(2);
      } else if (window.innerWidth <= windowInnerWidth.tablet) {
        setAmountOfMovies(8);
        setMoreMovies(2);
      } else {
        setAmountOfMovies(16);
        setMoreMovies(4);
      }
    } else if (movies.length !== 0) {
      setAmountOfMovies(movies.length);
    } else {
      setAmountOfMovies(0);
    }
  }

  function handleShowMoreBtnClick() {
    return setAmountOfMovies(amountOfMovies + moreMovies);
  }

  React.useEffect(() => {
    if (amountOfMovies <= movies.length) {
      setIsShowMoreBtnVisible(true)
    } else if (movies.length < amountOfMovies) {
      setIsShowMoreBtnVisible(false)
    }
  }, [amountOfMovies, movies.length])

  React.useEffect(() => {
    if (location.pathname === "/movies")
      window.addEventListener("resize", handleRenderingMovies);
    handleRenderingMovies();
    return () => window.removeEventListener("resize", handleRenderingMovies);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movies]);

  return {
    amountOfMovies,
    moreMovies,
    isShowMoreBtnVisible,
    handleShowMoreBtnClick
  };
}

export default useRenderMovies;
