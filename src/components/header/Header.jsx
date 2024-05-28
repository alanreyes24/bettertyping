import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Login from "../login/Login";
import './Header.css';  // Import the CSS file

function Header() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="header">
      <div className="logo">
        <Link to="/">bettertyping</Link>
      </div>
      <div className="nav-container">
        <nav>
          <ul className="nav-list">
            <li>
              <Link to="/">home</Link>
            </li>
            <li>
              <Link to="/leaderboard">leaderboard</Link>
            </li>
          </ul>
        </nav>
        <div className="login-container">
          <a onClick={() => setShowLogin(!showLogin)}>login</a>
          <Login loginVisible={showLogin} />
        </div>
      </div>
    </div>
  );
}

export default Header;
