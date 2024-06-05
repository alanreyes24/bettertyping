import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Login from "../login/Login";
import { useAuth } from "../../AuthContext";
import "./Header.css";

function Header() {

  const { usernameDB } = useAuth(); // Access the usernameDB state // ADDED

  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();

  return (
    <div className='header'>
      <div className='logo'>
        <Link to='/'>type.ac</Link>
      </div>
      <div> welcome, {usernameDB} </div>

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
            <li>
              <a onClick={() => setShowLogin(!showLogin)}> login </a>
              <Login loginVisible={showLogin} />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
