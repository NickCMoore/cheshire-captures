import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignInForm from "../pages/auth/SignInForm";
import { BrowserRouter as Router } from "react-router-dom";
import { SetCurrentUserContext } from "../contexts/CurrentUserContext";
import axios from "axios";

jest.mock("axios");

const mockSetCurrentUser = jest.fn();

describe("SignInForm", () => {
  beforeEach(() => {
    axios.post.mockClear();
  });

  test("renders the sign-in form fields", () => {
    render(
      <Router>
        <SetCurrentUserContext.Provider value={mockSetCurrentUser}>
          <SignInForm />
        </SetCurrentUserContext.Provider>
      </Router>,
    );

    expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /sign in/i }),
    ).toBeInTheDocument();
  });

  test("displays validation error if username or password is missing", async () => {
    render(
      <Router>
        <SetCurrentUserContext.Provider value={mockSetCurrentUser}>
          <SignInForm />
        </SetCurrentUserContext.Provider>
      </Router>,
    );

    const signInButton = screen.getByRole("button", { name: /sign in/i });
    fireEvent.click(signInButton);

    await waitFor(() => {
      const usernameError = screen.getByText(/this field may not be blank/i);
      expect(usernameError).toBeInTheDocument();
    });
  });

  test("submits the form and logs in the user", async () => {
    axios.post.mockResolvedValue({
      data: {
        access_token: "mockAccessToken",
        refresh_token: "mockRefreshToken",
        user: { photographer_id: 1 },
      },
    });

    render(
      <Router>
        <SetCurrentUserContext.Provider value={mockSetCurrentUser}>
          <SignInForm />
        </SetCurrentUserContext.Provider>
      </Router>,
    );

    fireEvent.change(screen.getByPlaceholderText("Enter username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    const signInButton = screen.getByRole("button", { name: /sign in/i });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("/dj-rest-auth/login/", {
        username: "testuser",
        password: "password123",
      });

      expect(mockSetCurrentUser).toHaveBeenCalledWith({ photographer_id: 1 });
    });
  });

  test("displays error message on failed login", async () => {
    axios.post.mockRejectedValue({
      response: {
        data: {
          non_field_errors: ["Unable to log in with provided credentials."],
        },
      },
    });

    render(
      <Router>
        <SetCurrentUserContext.Provider value={mockSetCurrentUser}>
          <SignInForm />
        </SetCurrentUserContext.Provider>
      </Router>,
    );

    fireEvent.change(screen.getByPlaceholderText("Enter username"), {
      target: { value: "wronguser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpassword" },
    });

    const signInButton = screen.getByRole("button", { name: /sign in/i });
    fireEvent.click(signInButton);

    await waitFor(() => {
      const errorMessage = screen.getByText(
        /unable to log in with provided credentials/i,
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
