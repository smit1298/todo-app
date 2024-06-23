import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import fetchMock from "fetch-mock";
import Login from "./Login";

describe("Login Component", () => {
  const setup = () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Login />
      </Router>
    );
    return { history };
  };

  beforeEach(() => {
    fetchMock.restore();
  });

  it("renders the login form", () => {
    setup();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("handles input changes", () => {
    setup();
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "testpass" }
    });
    expect(screen.getByLabelText(/username/i).value).toBe("testuser");
    expect(screen.getByLabelText(/password/i).value).toBe("testpass");
  });

  it("submits the form with valid credentials", async () => {
    fetchMock.getOnce("http://jsonplaceholder.typicode.com/users", [
      { id: 1, username: "testuser", password: "testpass" }
    ]);

    const { history } = setup();

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "testpass" }
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() =>
      expect(localStorage.getItem("jwt_token")).not.toBeNull()
    );
    await waitFor(() => expect(localStorage.getItem("user_id")).toBe("1"));

    await waitFor(() => {
      expect(history.location.pathname).toBe("/home");
    });
  });

  it("shows alert with invalid credentials", async () => {
    fetchMock.getOnce("http://jsonplaceholder.typicode.com/users", [
      { id: 1, username: "testuser", password: "wrongpass" }
    ]);

    setup();

    window.alert = jest.fn();

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpass" }
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith("Invalid credentials")
    );
  });

  it("handles fetch error", async () => {
    fetchMock.getOnce("http://jsonplaceholder.typicode.com/users", 500);

    setup();

    await waitFor(() =>
      expect(screen.queryByText(/error fetching users/i)).toBeInTheDocument()
    );
  });
});
