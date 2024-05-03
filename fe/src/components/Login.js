import "../styles/css/Login.css";

import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import SignUp from "./SignUp";

const Login = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    login(username, password);
  };

  if (showSignup) {
    return <SignUp onSignIn={() => setShowSignup(false)} />;
  }

  return (
    <div className="login">
      <h4>Login</h4>
      <form onSubmit={handleSubmit}>
        <div className="text_area">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>
        <div className="text_area">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button type="submit">Login</button>
        <button type="button" onClick={() => setShowSignup(true)}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Login;
