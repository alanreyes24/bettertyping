import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "../login/Login";
import LoginPopup from "../../screens/home/homepage/components/loginpopup/LoginPopup";
import "./Header.css";

function Header({ user, AIMode, passLoggedIn, passLogout }) {
  const [showLogin, setShowLogin] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isTestFinished, setIsTestFinished] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Hook to programmatically navigate

  // temporary solution until i connect the back passing into app.jsx

  const [username, setUsername] = useState("");

  const handleUsernameFromLoginPopup = (data) => {
    setUsername(data.username);
    passLoggedIn(data.userID, data.username);
    // this function only runs when login was successful so I can set showLogin to false
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
      setUsername("");
      passLogout();
    } catch (error) {
      console.log(error);
    }
  }

  // Handle home button click
  function handleHomeClick(e) {
    if (location.pathname === "/") {
      // e.preventDefault();
      // window.location.reload();
    } else {
      navigate("/");
    }
  }

  return (
    <div className="z-50 sticky top-0 bg-background container mx-auto flex h-16 max-w-9xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <a
        className="text-xl font-bold text-foreground cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        bettertyping
      </a>

      {username ? (
        <div className="welcome-message">welcome, {username}</div>
      ) : null}

      <div className="flex items-center gap-4">
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
            Sign Out
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

    // <div
    //   className="bg-background sticky top-0 container mx-auto my-12 max-w-7xl px-4 sm:px-6 lg:px-8"
    // >
    //   <div className="">
    //     <div className="ml-4 text-3xl font-medium">
    //       <a href="/" onClick={handleHomeClick}>
    //         bettertyping
    //       </a>
    //       {/* Use the home click handler */}
    //     </div>

    //     <div className="center-message">
    //       {userLoggedIn && !AIMode && (
    //         <div className="welcome-message">welcome, {user.username}</div>
    //       )}
    //     </div>

    //     <div className="button-container">
    //       <Link to="/" onClick={handleHomeClick}>
    //         <button className="button">
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             viewBox="0 0 24 24"
    //             width="24"
    //             height="24"
    //             className="icon"
    //           >
    //             <path
    //               fill="#ffffff"
    //               d="M12 3l9 9-1.5 1.5L18 11.5V21H6v-9.5l-1.5 1.5L3 12l9-9z"
    //             />
    //           </svg>
    //         </button>
    //       </Link>

    //       <Link to="/leaderboard">
    //         <button className="button">
    //           <svg
    //             width="28px"
    //             height="28px"
    //             viewBox="0 0 24 24"
    //             fill="none"
    //             xmlns="http://www.w3.org/2000/svg"
    //           >
    //             <path
    //               d="M14.2718 10.445L18 2M9.31612 10.6323L5 2M12.7615 10.0479L8.835 2M14.36 2L13.32 4.5M6 16C6 19.3137 8.68629 22 12 22C15.3137 22 18 19.3137 18 16C18 12.6863 15.3137 10 12 10C8.68629 10 6 12.6863 6 16Z"
    //               stroke="#ffffff"
    //               strokeWidth="1.5"
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //             />
    //             <path
    //               d="M10.5 15L12.5 13.5V18.5"
    //               stroke="#ffffff"
    //               strokeWidth="1.5"
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //             />
    //           </svg>
    //         </button>
    //       </Link>

    //       <Link to="/history">
    //         <button className="button">
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             viewBox="0 0 24 24"
    //             width="24"
    //             height="24"
    //             className="icon"
    //           >
    //             <path
    //               fill="#ffffff"
    //               d="M12 1C5.9 1 1 5.9 1 12s4.9 11 11 11 11-4.9 11-11S18.1 1 12 1zm0 2c5 0 9 4 9 9s-4 9-9 9-9-4-9-9 4-9 9-9zm-.5 2v6.3l5.3 3.2.7-1.2-4.5-2.7V5H11.5z"
    //             />
    //           </svg>
    //         </button>
    //       </Link>

    //       {!isTestFinished &&
    //         (!userLoggedIn ? (
    //           <button
    //             className="button"
    //             onClick={() => setShowLogin(!showLogin)}
    //           >
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               viewBox="0 0 24 24"
    //               width="24"
    //               height="24"
    //               className="icon"
    //             >
    //               <path
    //                 fill="#ffffff"
    //                 d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0 2c-2.7 0-8 1.4-8 4v2h16v-2c0-2.6-5.3-4-8-4z"
    //               />
    //             </svg>
    //           </button>
    //         ) : (
    //           <button className="button" onClick={logUserOut}>
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               viewBox="0 0 24 24"
    //               width="24"
    //               height="24"
    //               className="icon"
    //             >
    //               <path
    //                 fill="#ffffff"
    //                 d="M10 4v3H3v10h7v3h-8V4h8zm7 9l-4 4v-3h-5v-2h5v-3l4 4z"
    //               />
    //             </svg>
    //           </button>
    //         ))}

    // {showLogin && (
    //   <Login
    //     loginVisible={showLogin}
    //     passLoggedIn={(userID, username) => {
    //       setShowLogin(false);
    //       setUserLoggedIn(true);
    //       passLoggedIn(userID, username);
    //     }}
    //   />
    // )}
    //     </div>
    //   </div>
    // </div>
  );
}

export default Header;
