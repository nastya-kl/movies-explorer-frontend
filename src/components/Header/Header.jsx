import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./Header.css";
import Navigation from "../Navigation/Navigation";

function Header(isloggedIn) {
  const location = useLocation();
  const pathName =
    location.pathname === "/signin" || location.pathname === "/signup";

  return (
    !pathName && (
      <header
        className={`header ${
          location.pathname === "/" ? "header_color_blue" : "header_color_gray"
        }`}
      >
        <div className='header__container'>
          <Link className='header__logo' to='/'></Link>
          <Navigation />
        </div>
      </header>
    )
  );
}

export default Header;
