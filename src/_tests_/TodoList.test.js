import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TodoList from "./TodoList.test";

// Mock TodoItem component
jest.mock("./TodoItem", () => ({ todo, toggleTodo, removeTodo }) => (
  <div data-testid={`todo-item-${todo.id}`}>
    <span>{todo.text}</span>
    <button
      data-testid={`toggle-todo-${todo.id}`}
      onClick={() => toggleTodo(todo.id)}
    >
      Toggle
    </button>
    <button
      data-testid={`remove-todo-${todo.id}`}
      onClick={() => removeTodo(todo.id)}
    >
      Remove
    </button>
  </div>
));

describe("TodoList", () => {
  const todos = [
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Write Unit Tests", completed: true }
  ];

  const toggleTodo = jest.fn();
  const removeTodo = jest.fn();

  test("renders a list of todos", () => {
    render(
      <TodoList todos={todos} toggleTodo={toggleTodo} removeTodo={removeTodo} />
    );

    // Check if each todo is rendered
    todos.forEach((todo) => {
      expect(screen.getByTestId(`todo-item-${todo.id}`)).toBeInTheDocument();
      expect(screen.getByText(todo.text)).toBeInTheDocument();
    });
  });

  test("calls toggleTodo when the toggle button is clicked", () => {
    render(
      <TodoList todos={todos} toggleTodo={toggleTodo} removeTodo={removeTodo} />
    );

    // Simulate click on the toggle button of the first todo
    fireEvent.click(screen.getByTestId("toggle-todo-1"));

    expect(toggleTodo).toHaveBeenCalledWith(1);
  });

  test("calls removeTodo when the remove button is clicked", () => {
    render(
      <TodoList todos={todos} toggleTodo={toggleTodo} removeTodo={removeTodo} />
    );

    // Simulate click on the remove button of the first todo
    fireEvent.click(screen.getByTestId("remove-todo-1"));

    expect(removeTodo).toHaveBeenCalledWith(1);
  });
});
