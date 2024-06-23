// TodoFilter.test.js
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TodoFilter from "./TodoFilter.test";

test("renders buttons and handles click events", () => {
  const setFilterMock = jest.fn();

  render(<TodoFilter setFilter={setFilterMock} />);

  // Verify that buttons are rendered
  expect(screen.getByText("All")).toBeInTheDocument();
  expect(screen.getByText("Active")).toBeInTheDocument();
  expect(screen.getByText("Completed")).toBeInTheDocument();

  // Simulate button clicks and verify setFilter calls
  fireEvent.click(screen.getByText("All"));
  expect(setFilterMock).toHaveBeenCalledWith("all");

  fireEvent.click(screen.getByText("Active"));
  expect(setFilterMock).toHaveBeenCalledWith("active");

  fireEvent.click(screen.getByText("Completed"));
  expect(setFilterMock).toHaveBeenCalledWith("completed");
});
