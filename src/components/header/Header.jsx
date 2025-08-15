import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "../login/Login";
import LoginPopup from "../../screens/home/homepage/components/loginpopup/LoginPopup";
import "./Header.css";

function Header({ user, AIMode, passLoggedIn, passLogout }) {
  const [showLogin, setShowLogin] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const handleUsernameFromLoginPopup = (data) => {
    setUsername(data.username);
    passLoggedIn(data.userID, data.username);
    setUserLoggedIn(true);
    setShowLogin(false);
  };

  useEffect(() => {
    if (user.username && user.username !== "guest") {
      setUserLoggedIn(true);
      setUsername(user.username);
    } else {
      setUserLoggedIn(false);
    }
  }, [user.username]);

  async function logUserOut() {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUserLoggedIn(false);
      setUsername("");
      passLogout();
    } catch (error) {
      console.log(error);
    }
  }

  function handleHomeClick(e) {
    if (location.pathname === "/") {
      // e.preventDefault();
      // window.location.reload();
    } else {
      navigate("/");
    }
  }

  return (
    <div className="z-50 sticky top-0 bg-background container mx-auto flex h-16 max-w-9xl items-center justify-between px-4 sm:px-6 lg:px-8 mt-2">
      <a
        className="text-xl font-bold text-foreground cursor-pointer inline-flex"
        onClick={() => {
          navigate("/");
        }}
      >
        bettertyping
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 17 16"
          style={{ marginLeft: "6px", marginTop: "1px" }}
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M1 4.031V11h14.997V4.031H1zM11.969 5h1.047v1.023h-1.047V5zm1.047 1.969v1.047h-1.031V6.969h1.031zm-3.049-1.99h1.05v1.06h-1.05v-1.06zm1.055 1.996v1.062H9.979V6.975h1.043zm-3.04-1.996h1.033v1.036H7.982V4.979zm-.017 1.996h1.078v1.084H7.965V6.975zm-2.993-1.98h1.054v1.028H4.972V4.995zM7 6.988v1.049H5.985V6.988H7zm-1.969-.013v1.062H3.97V6.975h1.061zM2.969 4.984h1.062v1.047H2.969V4.984zm-1 1.995H3v1.037H1.969V6.979zM4 10H2V9h2v1zm8.021.021H4.969V8.968h7.052v1.053zM15 10h-2V9h2v1zm.016-2h-1.031V6.969h1.031V8zm0-1.977h-1.047V5h1.047v1.023z"
          />
        </svg>
      </a>

      <div className="flex items-center gap-4">
        {userLoggedIn && (
          <div>
            <Link to="/history">
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 448 512"
                  style={{ marginRight: "6px" }}
                >
                  <path
                    fill="currentColor"
                    d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7c-4.2-15.4-4.2-59.3 0-74.7c5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32c0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z"
                  ></path>
                </svg>
                history
              </button>
            </Link>
          </div>
        )}
        <Link to="/leaderboard">
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              style={{ marginRight: "6px", verticalAlign: "middle" }}
            >
              <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M13.693 3.25H6.307a1 1 0 0 0-.99 1.142l.637 4.45c.01.075.031.147.062.216c1.554 3.421 6.414 3.421 7.967 0a.792.792 0 0 0 .063-.216l.637-4.45a1 1 0 0 0-.99-1.142Zm-7.386-1a2 2 0 0 0-1.98 2.283l.637 4.451c.024.168.072.332.142.487c1.909 4.204 7.88 4.204 9.788 0c.07-.155.118-.319.142-.487l.637-4.45a2 2 0 0 0-1.98-2.284H6.307Z"></path>
                <path d="M9.5 14.75v-2.5h1v2.5h-1Z"></path>
                <path d="m13.086 16.75l-.793-.793a3.243 3.243 0 0 0-4.586 0l-.793.793h6.172ZM13 15.25a4.243 4.243 0 0 0-6 0l-.793.793c-.63.63-.184 1.707.707 1.707h6.172c.89 0 1.337-1.077.707-1.707L13 15.25ZM5 5a.5.5 0 0 1-.5.5H2a.5.5 0 0 1 0-1h2.5A.5.5 0 0 1 5 5Z"></path>
                <path d="M5.429 9.495c-2.151-.31-3.774-2.123-3.916-4.276l-.012-.186a.5.5 0 0 1 .998-.066l.012.186c.112 1.697 1.391 3.112 3.06 3.352l-.142.99ZM15 5a.5.5 0 0 0 .5.5H18a.5.5 0 0 0 0-1h-2.5a.5.5 0 0 0-.5.5Z"></path>
                <path d="M14.571 9.495c2.114-.304 3.77-1.946 3.906-4.116l.022-.348a.5.5 0 0 0-.998-.062l-.022.347c-.103 1.66-1.366 2.947-3.05 3.19l.142.989Z"></path>
              </g>
            </svg>
            leaderboard
          </button>
        </Link>

        {!userLoggedIn && (
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-primary hover:bg-primary/90 hover:text-accent-foreground h-10 px-4 py-2"
            onClick={() => setShowLogin(!showLogin)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              style={{ marginRight: "6px", verticalAlign: "middle" }}
            >
              <g fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M11 20a1 1 0 0 0-1-1H5V5h5a1 1 0 1 0 0-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5a1 1 0 0 0 1-1z"
                  clipRule="evenodd"
                ></path>
                <path d="M21.714 12.7a.996.996 0 0 0 .286-.697v-.006a.997.997 0 0 0-.293-.704l-4-4a1 1 0 1 0-1.414 1.414L18.586 11H9a1 1 0 1 0 0 2h9.586l-2.293 2.293a1 1 0 0 0 1.414 1.414l4-4l.007-.007z"></path>
              </g>
            </svg>
            log in
          </button>
        )}

        {userLoggedIn && (
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-primary hover:bg-primary/90 hover:text-accent-foreground h-10 px-4 py-2"
            onClick={logUserOut}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              style={{ marginRight: "6px", verticalAlign: "middle" }}
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4m-5-4l5-5l-5-5m5 5H3"
              ></path>
            </svg>
            sign out
          </button>
        )}
      </div>
      {showLogin && (
        <LoginPopup
          showHide={() => setShowLogin(!showLogin)}
          sendUsernameToHeader={handleUsernameFromLoginPopup}
        />
      )}
    </div>
  );
}

export default Header;
