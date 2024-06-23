import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SignJWT } from "jose";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const secretDetail = "26d9d127-3133-4e70-8ba3-d1d08d31703d";

  const handleLogin = async (e) => {
    e.preventDefault();
    // Find user by username
    const user = users.find((user) => user.username === username);
    // Validate credentials
    if (user) {
      if (!secretDetail) {
        console.error("Missing REACT_APP_SECRET_KEY environment variable");
        alert("Login failed. Please try again.");
        return;
      }
      try {
        // Create payload
        const payload = {
          username: user.username,
          id: user.id // Adding user ID to payload
        };
        const secret = new TextEncoder().encode(secretDetail);
        const token = await new SignJWT(payload)
          .setProtectedHeader({ alg: "HS256" })
          .sign(secret);

        // Store token and user ID (e.g., local storage)
        localStorage.setItem("jwt_token", token);
        localStorage.setItem("user_id", user.id);

        // Redirect to todo page
        navigate("/todo");
      } catch (error) {
        console.error("Error signing JWT:", error);
        alert("Login failed. Please try again.");
      }
    } else {
      alert("Invalid credentials");
      console.log("Login Failed");
    }
  };

  useEffect(() => {
    fetch("http://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "1em" }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
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
    </div>
  );
}

export default Login;
