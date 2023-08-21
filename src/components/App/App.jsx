import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  function getSavedMovies() {
    mainApi.getSavedMovies()
    .then((res) => {
      setSavedMovies(res.data);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
  }

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

  React.useEffect(() => {
    handleTokenCheck();

    if (isLoggedIn) {
      getSavedMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  async function handleRegister({ name, email, password }) {
    try {
      await mainApi.register({ name, email, password });
      handleLogin({ email, password });
    } catch (err) {
      console.log(`Ошибка: ${err}`);
    }
  }

  async function handleLogin({ email, password }) {
    try {
      const { token } = await mainApi.authorize({ email, password });
      localStorage.setItem("jwt", token);
      setIsLoggedIn(true);
      navigate("/movies", { replace: true });
    } catch (err) {
      console.log(`Ошибка: ${err}`);
    }
  }

  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("/signin", { replace: true });
  }

  function handleUpdateUserInfo(userInfo) {
    mainApi
      .changeUserInfo(userInfo)
      .then((user) => {
        setCurrentUser(user.data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleFilterMovies(moviesData, inputValue) {
    const data = moviesData.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(inputValue.toLowerCase());
    });

    if (data.length !== 0) {
      setFilteredMovies(data);
    } else {
      alert("Нет фильмов");
    }
  }

  function handleSearchMovies(inputValue) {
    moviesApi
      .getMovies()
      .then((res) => {
        setMovies(res);
        handleFilterMovies(res, inputValue);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleSaveMovie(movie) {
    const isLiked = savedMovies.some((savedMovie) => savedMovie.movieId === movie.movieId);

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
      const id = savedMovies.find((savedMovie) => savedMovie.movieId === movie.movieId)._id;

      mainApi
        .deleteMovie(id)
        .then(() => {
          setSavedMovies(savedMovies.filter((savedMovie) => savedMovie._id !== id));
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }

  function handleDeleteMovie(id) {
    mainApi
      .deleteMovie(id)
      .then(() =>
        setSavedMovies((movies) =>
          movies.filter((savedMovie) => savedMovie._id !== id)
        )
      )
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

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
                  onSaveMovie={handleSaveMovie}
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
                  onDeleteMovie={handleDeleteMovie}
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
                />
              }
            />

            <Route
              path='/signin'
              element={
                <Login
                  setIsLoggedIn={setIsLoggedIn}
                  isLoggedIn={isLoggedIn}
                  onLogin={handleLogin}
                />
              }
            />
            <Route
              path='/signup'
              element={<Register onRegister={handleRegister} />}
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
