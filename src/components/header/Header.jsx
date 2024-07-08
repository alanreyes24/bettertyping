import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Login from "../login/Login";
import { useAuth } from "../../AuthContext";
import "./Header.css";

function Header({ user, AIMode, passLoggedIn, passLogout }) {
  const [showLogin, setShowLogin] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (user.username && user.username !== "guest") {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
  }, [user.username]);

  async function logUserOut() {
    try {
      await axios.post(
        "http://localhost:3090/auth/logout",
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      style={{
        backgroundColor:
          AIMode || location.pathname === "/test-finished"
            ? "#80C080"
            : "#ADD8E6",
      }}
    >
      <div className="header">
        <div className="logo">
          <Link to="/">type.ac</Link>
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
                viewBox="0 0 576 512"
                fill="white"
              >
                <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4.1-2.8.1-4.2.1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2.1-2.4.2-3.6.2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9.1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
              </svg>
            </button>
          </Link>

          <Link to="/leaderboard">
            <button className="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                fill="#ffffff"
              >
                <path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6H426.6c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z" />
              </svg>
            </button>
          </Link>

          <Link to="/analysis">
            <button className="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  fill="#ffffff"
                  d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zm-312 8v64c0 13.3 10.7 24 24 24s24-10.7 24-24l0-64c0-13.3-10.7-24-24-24s-24 10.7-24 24zm80-96V280c0 13.3 10.7 24 24 24s24-10.7 24-24V120c0-13.3-10.7-24-24-24s-24 10.7-24 24zm80 64v96c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
                />
              </svg>{" "}
            </button>
          </Link>

          <Link to="/history">
            <button className="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  fill="#ffffff"
                  d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"
                />
              </svg>{" "}
            </button>
          </Link>

          {!userLoggedIn ? (
            <button className="button" onClick={() => setShowLogin(!showLogin)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="white"
              >
                <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
              </svg>
            </button>
          ) : (
            <button
              className="button"
              onClick={() => {
                setUserLoggedIn(false);
                logUserOut();
                passLogout();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="white"
              >
                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
              </svg>
            </button>
          )}

          {showLogin && (
            <>
              <Login
                loginVisible={showLogin}
                passLoggedIn={(userID, username) => {
                  setShowLogin(false);
                  setUserLoggedIn(true);
                  passLoggedIn(userID, username);
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
