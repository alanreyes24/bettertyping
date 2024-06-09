import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Login from "../login/Login";
import { useAuth } from "../../AuthContext";
import "./Header.css";

function Header({ username, passLogout }) {
  // const { usernameDB } = useAuth(); // Access the usernameDB state // ADDED realized i kinda don't need this

  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();

  return (
    <div className='header'>
      <div className='logo'>
        <Link to='/'>type.ac</Link>
      </div>

      {username && <div> welcome, {username} </div>}
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
              {username == "guest" || username == undefined ? (
                <>
                  <a onClick={() => setShowLogin(!showLogin)}>login</a>
                  <Login loginVisible={showLogin} />
                </>
              ) : (
                <>
                  <a
                    onClick={() => {
                      passLogout();
                    }}>
                    logout
                  </a>
                </>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
