// src/contexts/AuthContext.js
import React, { createContext, useContext, useState } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (userid, password) => {
    try {
      const token = await authService.loginToServer(userid, password);
      setUser({ userid, token });
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

  const signup = async (userid, username, password) => {
    try {
      const user = await authService.signup(userid, username, password);
      setUser(user);
    } catch (error) {
      console.error("Signup failed: ", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
