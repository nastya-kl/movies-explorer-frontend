import React from "react";
import { Route, Routes } from "react-router-dom";
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isPageNotFoundOpen, setIsPageNotFoundOpen] = React.useState(false);

  return (
    <div className='page'>
      {!isPageNotFoundOpen && <Header isloggedIn={isLoggedIn} />}

      <Routes>
        <Route path='/' element={<Main />} />

        <Route path='/movies' element={<ProtectedRoute
          element={Movies}
          isLoggedIn={isLoggedIn}
          />}
        />
        <Route path='/saved-movies' element={<ProtectedRoute
            element={SavedMovies}
            isLoggedIn={isLoggedIn}
          />}
        />
        <Route path='/profile' element={<ProtectedRoute
          element=
            {Profile}
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
          />}
        />

        <Route
          path='/signin'
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn} />
          }
        />
        <Route path='/signup' element={<Register />} />
        <Route
          path='*'
          element={<PageNotFound setIsPageNotFoundOpen={setIsPageNotFoundOpen}/> }
        />
      </Routes>

      {!isPageNotFoundOpen && <Footer />}
    </div>
  );
}

export default App;
