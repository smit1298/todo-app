import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Todo from "./components/Todo";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/todo" element={<Todo />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
