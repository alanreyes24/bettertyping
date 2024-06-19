import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Login from "../login/Login";
import { useAuth } from "../../AuthContext";
import "./Header.css";

function Header({ username, passLoggedIn, passLogout, passUser }) {

  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();

  const [appUsername, setAppUsername] = useState(username);

  useEffect(() => {
    setAppUsername(username);
    console.log("HEADER USERNAME: ", username)
  },[username])

  async function logUserOut() {
    console.log("this is runningasidaoisdhaiosdh")
    try {

      const response = await axios.post('http://localhost:3090/auth/logout', {}, {
        withCredentials: true,
      });

      console.log(response)

    } catch (error) {

      console.log(error)

    }


  }

  return (
    
    <div className='header'>
      <div className='logo'>
        <Link to='/'>type.ac</Link>
      </div>


    {appUsername == 'guest'? (
      <div style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', fontWeight: 'bold' }}> guest mode </div>    ): appUsername? (
      <div> welcome, {appUsername} </div>
    ) : null}

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
              {appUsername == "guest" || appUsername == undefined ? (
                <>
                  <a onClick={() => setShowLogin(!showLogin)}>login</a>
                  <Login loginVisible={showLogin} 

                  passUserObject={(user) => {
                    passUser(user)
                  }} 
                  passLoggedIn={(userID, username) => {
                      setAppUsername(username)
                      passLoggedIn(userID, username)
                  }} />
                </>
              ) : (
                <>
                  <a
                    onClick={() => {
                      setShowLogin(!showLogin) // not sure this is the super nice way to do this but
                      logUserOut() // just added
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
