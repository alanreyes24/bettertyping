import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "../login/Login";
import "./Header.css";

function Header({ user, AIMode, passLoggedIn, passLogout }) {
  const [showLogin, setShowLogin] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isTestFinished, setIsTestFinished] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Hook to programmatically navigate

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

  // Handle home button click
  function handleHomeClick(e) {
    if (location.pathname === "/") {
      e.preventDefault();
      window.location.reload();
    } else {
      navigate("/");
    }
  }

  return (

    <div className="sticky top-0 bg-background container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <a className="text-xl font-bold text-foreground" href="#">
        Better Typing
      </a>

      <div className="flex items-center gap-4">
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">

          Leaderboard
        </button>
        {/* <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">

          History
        </button> */}
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-primary hover:bg-primary/90 hover:text-accent-foreground h-10 px-4 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4"
          >
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
            <polyline points="10 17 15 12 10 7"></polyline>
            <line x1="15" x2="3" y1="12" y2="12"></line>
          </svg>
          Sign In
        </button>
      </div>
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

    //       {showLogin && (
    //         <Login
    //           loginVisible={showLogin}
    //           passLoggedIn={(userID, username) => {
    //             setShowLogin(false);
    //             setUserLoggedIn(true);
    //             passLoggedIn(userID, username);
    //           }}
    //         />
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
}

export default Header;
