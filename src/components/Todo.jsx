import { useState, useEffect } from "react";
import TodoList from "./TodoList";
import TodoFilter from "./TodoFilter";
import "../styles/Todo.css";
import { ColorRing } from "react-loader-spinner";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true); 
  const todoId = localStorage.getItem("user_id");
  const bearerToken = localStorage.getItem("jwt_token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos",
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`
            }
          }
        );
        const data = await response.json();
        const filteredData = data.filter(
          (todo) => todo.userId === parseInt(todoId, 10)
        );
        setTodos(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchData();
  }, [todoId, bearerToken]); 

  const addTodo = (title) => {
    const newTodo = {
      id: Date.now(),
      title,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const completeAll = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({ ...todo, completed: true }))
    );
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "active":
        return !todo.completed;
      case "completed":
        return todo.completed;
      default:
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
      {isLoading ? (
        <div>
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      ) : (
        <>
          <TodoList
            todos={filteredTodos}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
          />
          {todos.length !== 0 && (
            <button onClick={completeAll}>Complete All</button>
          )}
        </>
      )}
      <TodoFilter setFilter={setFilter} />
    </div>
  );
};

export default Todo;
