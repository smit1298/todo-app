import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Todo from "./components/Todo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Todo />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
