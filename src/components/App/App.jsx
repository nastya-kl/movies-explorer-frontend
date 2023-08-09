import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  console.log(isLoggedIn);

  return (
    <div className='page'>
      <Header isloggedIn={isLoggedIn} />

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
          element={isLoggedIn ? <Navigate to='/movies' /> : <Navigate to='/' />}
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
