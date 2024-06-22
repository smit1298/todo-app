import  { useState } from "react";
import PropTypes from "prop-types";
import { generateToken } from "./auth";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "user" && password === "password") {
      const token = generateToken(username);
      localStorage.setItem("token", token);
      onLogin();
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired
};

export default Login;
