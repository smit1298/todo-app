import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Todo from "../components/Todo";
import { rest } from "msw";
import "@testing-library/jest-dom";
import { setupServer } from "msw/node";
import "whatwg-fetch";
import 'es6-promise/auto'; // Ensure ES6 Promises are polyfilled
import 'isomorphic-fetch'; // Import the isomorphic fetch



// Mock todos data
const mockTodos = [
  { userId: 1, id: 1, title: "Test Todo 1", completed: false },
  { userId: 1, id: 2, title: "Test Todo 2", completed: true }
];

const server = setupServer(
  rest?.get("https://jsonplaceholder.typicode.com/todos", (req, res, ctx) => {
    return res(ctx.json(mockTodos));
  })
);

// Start server before tests and close it after
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Todo component", () => {
  it("renders loading spinner when isLoading is true", () => {
    render(<Todo />);
    expect(screen.getByLabelText("color-ring-loading")).toBeInTheDocument();
  });
  it("renders todos after data fetching", async () => {
    render(<Todo />);
    await waitFor(() => expect(screen.getByText("Todo 1")).toBeInTheDocument());
    await waitFor(() =>
      expect(screen.getAllByRole("listitem")).toHaveLength(mockTodos.length)
    );
  });

  it("adds a new todo", async () => {
    render(<Todo />);
    const input = screen.getByPlaceholderText("Add a new todo...");
    fireEvent.change(input, { target: { value: "New Todo Item" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    await waitFor(() =>
      expect(screen.getByText("New Todo Item")).toBeInTheDocument()
    );
  });
});
