// src/contexts/AuthContext.js

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [usernameDB, setUsernameDB] = useState('');

    return (
        <AuthContext.Provider value={{ usernameDB, setUsernameDB }}>
            { children }
        </AuthContext.Provider>
    );
};