import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

function App() {
  return (
    <div className='page'>
      <Header />

      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/saved-movies' element={<SavedMovies />} />
        {/* <Route path='/profile' element={<Movies />} />
        <Route path='/signin' element={<Movies />} />
        <Route path='/signup' element={<Movies />} /> */}
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
