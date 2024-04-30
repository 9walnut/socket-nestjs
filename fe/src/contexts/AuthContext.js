// src/contexts/AuthContext.js
import React, { createContext, useContext, useState } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const token = await authService.loginToServer(username, password);
      setUser({ username, token });
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};