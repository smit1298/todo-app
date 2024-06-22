import { useState } from "react";
import TodoList from "./TodoList";
import TodoFilter from "./TodoFilter";
import "../styles/Todo.css"


const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  const removeTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const completeAll = () => {
    const newTodos = todos.map((todo) =>
      todo.completed ? todo : { ...todo, completed: true }
    );
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") {
      return !todo.completed;
    } else if (filter === "completed") {
      return todo.completed;
    } else {
      return true;
    }
  });

  return (
    <div className="Todo">
      <h1>Todo App</h1>
      <input
        type="text"
        placeholder="Add a new todo..."
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.value.trim()) {
            addTodo(e.target.value.trim());
            e.target.value = "";
          }
        }}
      />
      <TodoList
        todos={filteredTodos}
        toggleTodo={toggleTodo}
        removeTodo={removeTodo}
      />
      {todos.length !== 0 && (
        <button onClick={completeAll}>Complete All</button>
      )}
      <TodoFilter setFilter={setFilter} />
    </div>
  );
}   

export default Todo;
