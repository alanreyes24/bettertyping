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
        "http://localhost:3090/auth/login",
        {
          username,
          password,
        },
        {
          withCredentials: true, // Ensure cookies are included in the request
        }
      );

      console.log("handleLogin response:", response.data);

      localStorage.setItem("userID", response.data.userId);
      localStorage.setItem("username", response.data.username);

      console.log("Cookies should be set in the response. Check the Application tab in Developer Tools.");

      setLoginVisible(false);
      passLoggedIn(username);

    } catch (error) {
      setError(error);
      console.error("Error logging in:", error.response);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3090/auth/signup",
        {
          username,
          password,
        }
      );
      setShowRegister(false);
    } catch (error) {
      setError(error);
      console.error("Error registering:", error.response.data);
    }
  };

  return showLogin ? (
    <div className="login-container show">
      <button onClick={() => console.log(error)}>test show error</button>
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
          {error && <div style={{ color: "red" }}>{error.response.data}</div>}
          <button className="login-button" type="submit">
            {showRegister ? "Register" : "Login"}
          </button>
          <div className="toggle-link-container">
            <a className="toggle-link" onClick={() => setShowRegister(!showRegister)}>
              {showRegister
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </a>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}

export default Login;
