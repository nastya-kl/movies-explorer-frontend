import React from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import PageNotFound from "../PageNotFound/PageNotFound";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import InfoToolTip from "../InfoToolTip/InfoToolTip";
import { toolTipMessages, SHORT_MOVIE_DURATION } from "../../utils/constants";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem('jwt') ? true : false);
  const [isPageNotFoundOpen, setIsPageNotFoundOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [movies, setMovies] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isInfoToolTipOpened, setIsInfoToolTipOpened] = React.useState(false);
  const [infoToolTipTitle, setInfoToolTipTitle] = React.useState("");
  const [isInfoToolTipCorrect, setIsInfoToolTipCorrect] = React.useState(false);
  const [moviesListPageText, setMoviesListPageText ] = React.useState('Введите название фильма в строку поиска')

  const navigate = useNavigate();
  const location = useLocation();

  // Получить список сохранённых фильмов с бэка
  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.all([mainApi.getSavedMovies()])
        .then(([savedMovies]) => {
          setSavedMovies(savedMovies.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  // Открыть попап с информацией для пользователя
  function handleOpenInfoToolTip(isOpen, isCorrect, title) {
    setIsInfoToolTipOpened(isOpen);
    setIsInfoToolTipCorrect(isCorrect);
    setInfoToolTipTitle(title);
  }

  // Закрыть попап с информацией для пользователя
  function handleCloseInfoToolTip() {
    setIsInfoToolTipOpened(false);
  }

  // Авторизация пользователя
  function handleLogin({ email, password }) {
    setIsLoading(true);
    mainApi
      .authorize({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        handleOpenInfoToolTip(true, false, toolTipMessages.signinErrorMessage);
        setIsLoggedIn(false);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Регистрация пользователя
  function handleRegister({ name, email, password }) {
    setIsLoading(true);
    mainApi
      .register({ name, email, password })
      .then(() => {
        handleLogin({ email, password });
        handleOpenInfoToolTip(true, true, toolTipMessages.signupSuccessMessage);
      })
      .catch((err) => {
        handleOpenInfoToolTip(true, false, toolTipMessages.signupErrorMessage);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Выход из профиля
  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.clear();
    navigate("/", { replace: true });
  }

  // Обновление информации пользователя
  function handleUpdateUserInfo(userInfo) {
    setIsLoading(true);
    mainApi
      .changeUserInfo(userInfo)
      .then((user) => {
        setCurrentUser(user.data);
        handleOpenInfoToolTip(
          true,
          true,
          toolTipMessages.updateProfileSuccessMessage
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Фильтрация фильмов
  function handleFilterMovies(movieData, inputValue, isShort) {
    let data = movieData.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(inputValue.toLowerCase());
    });

    if (isShort) {
      data = data.filter((movie) => movie.duration < SHORT_MOVIE_DURATION);
    }

    if (data.length !== 0 && location.pathname === "/movies") {
      setFilteredMovies(data);
      localStorage.setItem(
        "searchMoviesHistory",
        JSON.stringify({ data, inputValue, isShort })
      );
    } else if (data.length !== 0 && location.pathname === "/saved-movies") {
      setFilteredSavedMovies(data);
      localStorage.setItem(
        "searchSavedMoviesHistory",
        JSON.stringify({ data, inputValue, isShort })
      );
    } else {
      setFilteredMovies([]);
      setFilteredSavedMovies([]);
      handleOpenInfoToolTip(true, false, "Фильм не найден");
      setMoviesListPageText('Ничего не найдено');
    }
  }

  // Поиск фильмов
  function handleSearchMovies(inputValue, isShort) {
    setIsLoading(true);

    if (movies.length === 0) {
      moviesApi
        .getMovies()
        .then((movies) => {
          setMovies(movies);
          handleFilterMovies(movies, inputValue, isShort);
        })
        .catch((err) => {
          handleOpenInfoToolTip(
            true,
            false,
            toolTipMessages.serverConnectionError
          );
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      handleFilterMovies(movies, inputValue, isShort);
      setIsLoading(false);
    }
  }

  // Поиск сохраненных фильмов
  function handleSearchSavedMovies(inputValue, isShort) {
    handleFilterMovies(savedMovies, inputValue, isShort);
  }

  // Поиск короткометражек по нажатию на чекбокс
  function toggleCheckboxButton(inputValue, isShort) {
    if (location.pathname === "/movies" && inputValue !== "") {
      handleSearchMovies(inputValue, isShort);
    } else if (location.pathname === "/saved-movies") {
      handleSearchSavedMovies(inputValue, isShort);
    }
  }

  // Нажатие на кнопку лайка фильма на главной странице
  function handleSaveMovie(movie) {
    const isLiked = savedMovies.some(
      (savedMovie) => savedMovie.movieId === movie.movieId
    );

    if (!isLiked) {
      mainApi
        .saveMovie(movie)
        .then((savedMovie) =>
          setSavedMovies((movies) => [...movies, savedMovie.data])
        )
        .catch((err) => {
          console.log(err);
        });
    } else {
      const id = savedMovies.find(
        (savedMovie) => savedMovie.movieId === movie.movieId
      )._id;

      mainApi
        .deleteMovie(id)
        .then(() => {
          setSavedMovies(
            savedMovies.filter((savedMovie) => savedMovie._id !== id)
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // Нажатие на кнопку удаления фильма на странице с сохранёнными фильмами
  function handleDeleteMovie(id) {
    mainApi
      .deleteMovie(id)
      .then(
        () =>
          setSavedMovies((movies) =>
            movies.filter((savedMovie) => savedMovie._id !== id)
          ),
        setFilteredSavedMovies((movies) =>
          movies.filter((savedMovie) => savedMovie._id !== id)
        )
      )
      .catch((err) => {
        console.log(err);
      });
  }

  // Проверить токен
  function handleTokenCheck() {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      mainApi
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setCurrentUser(res.data);
            navigate(`${location.pathname}${location.search}`, { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoggedIn(false);
          setCurrentUser({});
          navigate("/signin", { replace: true });
          handleOpenInfoToolTip(true, false, toolTipMessages.tokenCheckError);
        });
    }
  }

  // Реализовать проверку токена
  React.useEffect(() => {
    if (isLoggedIn) {
      handleTokenCheck();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  React.useEffect(() => {
    if (
      (location.pathname === "/signup" || location.pathname === "/signin") &&
      isLoggedIn
    ) {
      navigate('/', { replace: true });
    }
  }, [isLoggedIn, location.pathname, navigate]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <div className='wrapper'>
          {!isPageNotFoundOpen && <Header isloggedIn={isLoggedIn} />}

          <Routes>
            <Route path='/' element={<Main />} />

            <Route
              path='/movies'
              element={
                <ProtectedRoute
                  element={Movies}
                  isLoggedIn={isLoggedIn}
                  movies={filteredMovies}
                  savedMovies={savedMovies}
                  setMovies={setFilteredMovies}
                  onSearchMovies={handleSearchMovies}
                  onChecked={toggleCheckboxButton}
                  onSaveMovie={handleSaveMovie}
                  isLoading={isLoading}
                  handleOpenInfoToolTip={handleOpenInfoToolTip}
                  pageText={moviesListPageText}
                  setPageText={setMoviesListPageText}
                />
              }
            />

            <Route
              path='/saved-movies'
              element={
                <ProtectedRoute
                  element={SavedMovies}
                  isLoggedIn={isLoggedIn}
                  movies={savedMovies}
                  filteredSavedMovies={filteredSavedMovies}
                  setSavedMovies={setFilteredSavedMovies}
                  onSearchSavedMovies={handleSearchSavedMovies}
                  onDeleteMovie={handleDeleteMovie}
                  onChecked={toggleCheckboxButton}
                  handleOpenInfoToolTip={handleOpenInfoToolTip}
                  pageText={moviesListPageText}
                  setPageText={setMoviesListPageText}
                />
              }
            />
            <Route
              path='/profile'
              element={
                <ProtectedRoute
                  element={Profile}
                  isLoggedIn={isLoggedIn}
                  onLogout={handleLogout}
                  onUpdateUserInfo={handleUpdateUserInfo}
                  isLoading={isLoading}
                />
              }
            />

            <Route
              path='/signin'
              element={
                <Login
                  setIsLoggedIn={setIsLoggedIn}
                  onLogin={handleLogin}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path='/signup'
              element={
                <Register onRegister={handleRegister} isLoading={isLoading} />
              }
            />

            <Route
              path='*'
              element={
                <PageNotFound setIsPageNotFoundOpen={setIsPageNotFoundOpen} />
              }
            />
          </Routes>

          {!isPageNotFoundOpen && <Footer />}
        </div>

        <InfoToolTip
          isOpen={isInfoToolTipOpened}
          title={infoToolTipTitle}
          isCorrect={isInfoToolTipCorrect}
          onClose={handleCloseInfoToolTip}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
