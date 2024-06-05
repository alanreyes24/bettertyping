import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Login from "../login/Login";
import { useAuth } from "../../AuthContext";
import "./Header.css";

function Header() {

  // const { usernameDB } = useAuth(); // Access the usernameDB state // ADDED realized i kinda don't need this

  async function getProfile() {
    const token = localStorage.getItem('auth-token');
    
    try {
      const response = await axios.get('http://localhost:3090/auth/profile', {
        headers: {
          'auth-token': token 
        }
      });

      setFetchedUsername(response.data.username);
    

    } catch (error) {
      console.error('Failed to fetch profile:', error.response.data);
    }
  }

  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();
  const [fetchedUsername, setFetchedUsername] = useState('');


  useEffect(() => {
    getProfile();
  }, [showLogin])
  return (
    <div className='header'>
      <div className='logo'>
        <Link to='/'>type.ac</Link>
      </div>
      <div> welcome, {fetchedUsername} </div>
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
