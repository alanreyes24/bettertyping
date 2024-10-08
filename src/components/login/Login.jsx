import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Login.css";

function Login({ loginVisible, passLoggedIn }) {
  const [showLogin, setLoginVisible] = useState(loginVisible);
  const [showRegister, setShowRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setLoginVisible(loginVisible);
  }, [loginVisible]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      let userID = response.data.userID;
      let confirmedUsername = response.data.username;

      await passLoggedIn(userID, confirmedUsername);
      setLoginVisible(false);
    } catch (error) {
      setError(error.response ? error.response.data : "An error occurred");
      console.log(error.response ? error.response.data : error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        {
          username,
          password,
        }
      );
      setShowRegister(false);
    } catch (error) {
      setError(error.response ? error.response.data : "An error occurred");
      console.error(
        "Error registering:",
        error.response ? error.response.data : error
      );
    }
  };

  return (
    <div className="login-container show">
      <div className="login-box">
        <form
          className="login-form"
          onSubmit={showRegister ? handleRegister : handleLogin}
        >
          <input
            className="login-input"
            placeholder="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="login-input"
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <div style={{ color: "red" }}>{error.message || error}</div>
          )}
          <button className="login-button" type="submit">
            {showRegister ? "Register" : "Login"}
          </button>
          <div className="toggle-link-container">
            <a
              className="toggle-link"
              onClick={() => setShowRegister(!showRegister)}
            >
              {showRegister
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
