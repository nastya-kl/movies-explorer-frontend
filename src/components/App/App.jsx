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
  // const [savedMovies, setSavedMovies] = React.useState([]);
  
  const navigate = useNavigate();

  function getAllMovies() {
    if (isLoggedIn) {
      Promise.all([moviesApi.getMovies()])
        .then(([movies]) => setMovies(movies))
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
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
    getAllMovies();
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
    mainApi.changeUserInfo(userInfo)
      .then((user) => {
        setCurrentUser(user.data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  // function handleSaveMovie(movie) {
  //   mainApi.saveMovie(movie._id)
  //     .then((newMovie) => {
  //       setSavedMovies((state) => state.map((c) => c._id === movie._id ? newMovie.data : c));
  //     })
  //     .catch((err) => {
  //       console.log(`Ошибка: ${err}`);
  //     })
  // }

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
                  movies={movies}
                  setMovies={setMovies}
                />
              }
            />

            <Route
              path='/saved-movies'
              element={
                <ProtectedRoute element={SavedMovies} isLoggedIn={isLoggedIn} />
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
