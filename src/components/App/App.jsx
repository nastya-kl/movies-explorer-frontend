import React from "react";
import { Route, Routes } from 'react-router-dom';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";

function App() {

  return (
    <div className="page">

      <Header/>

      <Routes>
        <Route path="/" element={<Main/>}/>
      </Routes>

      <Footer />

    </div>
  );

};

export default App;