// src/App.js
import React from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./components/Login";
import ChatApp from "./components/ChatApp";
import "./App.css";

function AuthenticatedApp() {
  const { user } = useAuth();
  return user ? <ChatApp /> : <Login />;
}

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <AuthenticatedApp />
      </AuthProvider>
    </div>
  );
}

export default App;
