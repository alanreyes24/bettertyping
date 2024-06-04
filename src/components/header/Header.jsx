import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Login from "../login/Login";
import "./Header.css";

function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();

  return (
    <div className='header'>
      <div className='logo'>
        <Link to='/'>type.ac</Link>
      </div>
      <div className='nav-container'>
        <nav>
          <ul className='nav-list'>
            <li>
              <Link
                to='/'
                className={location.pathname === "/" ? "active" : ""}>
                home
              </Link>
            </li>
            <li>
              <Link
                to='/leaderboard'
                className={
                  location.pathname === "/leaderboard" ? "active" : ""
                }>
                leaderboard
              </Link>
            </li>
            <li>
              <Link
                to='/analysis'
                className={location.pathname === "/analysis" ? "active" : ""}>
                analysis
              </Link>
            </li>
          </ul>
        </nav>
        <div className='login-container'>
          <a onClick={() => setShowLogin(!showLogin)}>login</a>
          <Login loginVisible={showLogin} />
        </div>
      </div>
    </div>
  );
}

export default Header;
