import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import "../styles/css/SignUp.css";

const SignUp = ({ onSignIn }) => {
  const [userid, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    signup(userid, username, password);
  };

  return (
    <div className="signup">
      <h4>Sign Up</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="UserNickname"
          />
        </div>
        <div>
          <input
            type="text"
            value={userid}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="userid"
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

export default SignUp;
