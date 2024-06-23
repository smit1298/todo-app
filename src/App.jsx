import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import "./App.css";
import Todo from "./components/Todo";
import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  const token = localStorage.getItem("jwt_token");

  return (
    <Router>
      {token && (
        <nav>
          <ul className="nav">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/todo">Todo</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <LogoutButton />
            </li>
          </ul>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user_id");
    navigate("/");
    window.location.reload();
  };

  return <button onClick={handleLogout}>Log Out</button>;
}

export default App;
