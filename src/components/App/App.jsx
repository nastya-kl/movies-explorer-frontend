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
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isPageNotFoundOpen, setIsPageNotFoundOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [movies, setMovies] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Получить список всех фильмов с сервера BeatFilms и список сохранённых фильмо с бэка
  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.all([mainApi.getSavedMovies()])
        .then(([savedMovies]) => {
          setSavedMovies(savedMovies.data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [isLoggedIn]);

  // Авторизация пользователя
  function handleLogin({ email, password }) {
    setIsLoading(true);
    mainApi
      .authorize({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          navigate("/movies", { replace: true });
        }
      })
      .then(() => {
        
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
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
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Выход из профиля
  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("/signin", { replace: true });
  }

  // Обновление информации пользователя
  function handleUpdateUserInfo(userInfo) {
    setIsLoading(true);
    mainApi
      .changeUserInfo(userInfo)
      .then((user) => {
        setCurrentUser(user.data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
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
      data = data.filter((movie) => movie.duration < 40);
    }

    if (data.length !== 0 && location.pathname === "/movies") {
      setFilteredMovies(data);
    } else if (data.length !== 0 && location.pathname === "/saved-movies") {
      setFilteredSavedMovies(data);
    } else {
      setFilteredMovies([]);
      setFilteredSavedMovies([]);
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
          console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      handleFilterMovies(movies, inputValue, isShort);
      setIsLoading(false);
    }
  }

  console.log(filteredMovies);

  // Поиск сохраненных фильмов
  function handleSearchSavedMovies(inputValue, isShort) {
    handleFilterMovies(savedMovies, inputValue, isShort);
  }

  // Поиск короткометражек по нажатию на чекбокс
  function toggleCheckboxButton(inputValue, isShort) {
    if (location.pathname === "/movies" && inputValue !== '') {
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
          console.log(`Ошибка: ${err}`);
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
          console.log(`Ошибка: ${err}`);
        });
    }
  }

  // Нажатие на кнопку удаления фильма на странице с сохранёнными фильмами
  function handleDeleteMovie(id) {
    mainApi
      .deleteMovie(id)
      .then(() =>
        setSavedMovies((movies) =>
          movies.filter((savedMovie) => savedMovie._id !== id)
        ),
        setFilteredSavedMovies((movies) =>
          movies.filter((savedMovie) => savedMovie._id !== id)
        )
      )
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
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
            navigate({ replace: false });
          }
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }

  // Реализовать проверку токена
  React.useEffect(() => {
    handleTokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

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
                  setSavedMovies={setSavedMovies}
                  onSearchSavedMovies={handleSearchSavedMovies}
                  onDeleteMovie={handleDeleteMovie}
                  onChecked={toggleCheckboxButton}
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
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
