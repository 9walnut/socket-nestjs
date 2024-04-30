import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const SignUp = ({ onSignIn }) => {
  const [usernickname, setUsernickname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    signup(usernickname, username, password);
  };

  return (
    <div className="signup">
      <h4>Sign Up</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={usernickname}
            onChange={(e) => setUsernickname(e.target.value)}
            placeholder="UserNickname"
          />
        </div>
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>

        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button type="submit">Sign Up</button>
        <button type="button" onClick={onSignIn}>
          Already have an account? Sign In
        </button>
      </form>
    </div>
  );
};
