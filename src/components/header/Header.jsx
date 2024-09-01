import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Login from "../login/Login";
import "./Header.css";

function Header({ user, AIMode, passLoggedIn, passLogout }) {
  const [showLogin, setShowLogin] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isTestFinished, setIsTestFinished] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (user.username && user.username !== "guest") {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
  }, [user.username]);

  useEffect(() => {
    setIsTestFinished(location.pathname === "/test-finished");
  }, [location.pathname]);

  async function logUserOut() {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUserLoggedIn(false);
      passLogout();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      style={{
        backgroundColor: AIMode ? "#80C080" : "#273564",
      }}
    >
      <div className="header">
        <div className="logo">
          <Link to="/">bettertyping</Link>
        </div>

        {AIMode && <div> AI TEST MODE </div>}

        {user.username === "guest" && !AIMode ? (
          <div
            style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)", fontWeight: "bold" }}
          >
            guest mode
          </div>
        ) : user.username && !AIMode ? (
          <div> welcome, {user.username} </div>
        ) : null}

        <div className="button-container">
          <Link to="/">
            <button className="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="icon"
              >
                <path
                  fill="#ffffff"
                  d="M12 3l9 9-1.5 1.5L18 11.5V21H6v-9.5l-1.5 1.5L3 12l9-9z"
                />
              </svg>
            </button>
          </Link>

          <Link to="/leaderboard">
            <button className="button">
              <svg
                width="28px"
                height="28px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.2718 10.445L18 2M9.31612 10.6323L5 2M12.7615 10.0479L8.835 2M14.36 2L13.32 4.5M6 16C6 19.3137 8.68629 22 12 22C15.3137 22 18 19.3137 18 16C18 12.6863 15.3137 10 12 10C8.68629 10 6 12.6863 6 16Z"
                  stroke="#ffffff"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.5 15L12.5 13.5V18.5"
                  stroke="#ffffff"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </Link>

          <Link to="/history">
            <button className="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="icon"
              >
                <path
                  fill="#ffffff"
                  d="M12 1C5.9 1 1 5.9 1 12s4.9 11 11 11 11-4.9 11-11S18.1 1 12 1zm0 2c5 0 9 4 9 9s-4 9-9 9-9-4-9-9 4-9 9-9zm-.5 2v6.3l5.3 3.2.7-1.2-4.5-2.7V5H11.5z"
                />
              </svg>
            </button>
          </Link>

          {!isTestFinished &&
            (!userLoggedIn ? (
              <button
                className="button"
                onClick={() => setShowLogin(!showLogin)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="icon"
                >
                  <path
                    fill="#ffffff"
                    d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0 2c-2.7 0-8 1.4-8 4v2h16v-2c0-2.6-5.3-4-8-4z"
                  />
                </svg>
              </button>
            ) : (
              <button className="button" onClick={logUserOut}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="icon"
                >
                  <path
                    fill="#ffffff"
                    d="M10 4v3H3v10h7v3h-8V4h8zm7 9l-4 4v-3h-5v-2h5v-3l4 4z"
                  />
                </svg>
              </button>
            ))}

          {showLogin && (
            <Login
              loginVisible={showLogin}
              passLoggedIn={(userID, username) => {
                setShowLogin(false);
                setUserLoggedIn(true);
                passLoggedIn(userID, username);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
