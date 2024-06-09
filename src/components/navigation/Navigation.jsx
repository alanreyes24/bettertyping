// src/components/navigation/Navigation.jsx
import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/leaderboard'>LeaderBoard</Link>
        </li>
        <li>
          <Link to='/analysis'>Analysis</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
