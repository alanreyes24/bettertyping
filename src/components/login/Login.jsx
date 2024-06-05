import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from '../../AuthContext';
import "./Login.css";

function Login({ loginVisible }) {
    const [showLogin, setLoginVisible] = useState(loginVisible);
    const [showRegister, setShowRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameDB, setUsernameDBState] = useState(""); // database that is retrieved from the database , should change to 'fetchedUsername' or something
    const [showUserLoggedIn, setShowUserLoggedIn] = useState(false); // show 'hey, <username>'
    const [error, setError] = useState("");

    const { setUsernameDB } = useAuth();

    useEffect(() => {
        setLoginVisible(loginVisible);
    }, [loginVisible]);

    async function getProfile() {
        const token = localStorage.getItem('auth-token');
        
        try {
          const response = await axios.get('http://localhost:3090/auth/profile', {
            headers: {
              'auth-token': token 
            }
          });
      

          setUsernameDB(response.data.username);
          setUsernameDBState(response.data.username); // Update local state

        } catch (error) {
          console.error('Failed to fetch profile:', error.response.data);
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3090/auth/login", { username, password });
            localStorage.setItem("auth-token", response.data.token);
            getProfile();
        } catch (error) {
            setError(error)
            console.error("Error logging in:", error.response.data);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3090/auth/signup", { username, password });
            setShowRegister(false);
        } catch (error) {
            setError(error)
            console.error("Error registering:", error.response.data);
        }
    };

    return (
        showLogin ? (
            <div className="login-container show">
                <button onClick={() => console.log(error)}> test show error </button>
                <div className="login-box">
                    <form className="login-form" onSubmit={showRegister ? handleRegister : handleLogin}>
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
                            <div style={{ color: 'red' }}>{error.response.data}</div>
                        )}
                        <button className="login-button" type="submit">
                            {showRegister ? "Register" : "Login"}
                        </button>
                        <div className="toggle-link-container">
                            <a
                                className="toggle-link"
                                onClick={() => setShowRegister(!showRegister)}
                            >
                                {showRegister ? "Already have an account? Login" : "Don't have an account? Register"}
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        ) : null
    );
}

export default Login;
