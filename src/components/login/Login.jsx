import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Login.css";

function Login({ loginVisible }) {
    const [showLogin, setLoginVisible] = useState(loginVisible);
    const [showRegister, setShowRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        setLoginVisible(loginVisible);
    }, [loginVisible]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/login", { username, password });
            console.log("User logged in successfully:", response.data);
            // Store the token in local storage or state
            localStorage.setItem("auth-token", response.data.token);
        } catch (error) {
            console.error("Error logging in:", error.response.data);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/signup", { username, password });
            console.log("User registered successfully:", response.data);
            setShowRegister(false);
        } catch (error) {
            console.error("Error registering:", error.response.data);
        }
    };

    return (
        <div className={`login-container ${showLogin ? "show" : "hide"}`}>
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
    );
}

export default Login;
