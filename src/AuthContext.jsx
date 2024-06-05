// src/contexts/AuthContext.js

// i just realized I don't think we actually need this file or contexts

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