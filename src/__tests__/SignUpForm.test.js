import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SignUpForm from "../pages/auth/SignUpForm";
import axios from "axios";

jest.mock("axios");

describe("SignUpForm", () => {
  test("renders the sign-up form fields", () => {
    render(
      <Router>
        <SignUpForm />
      </Router>,
    );

    expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm password")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  test("displays validation error if username or password is missing", async () => {
    render(
      <Router>
        <SignUpForm />
      </Router>,
    );

    const signUpButton = screen.getByText("Sign Up");
    fireEvent.click(signUpButton);

    await waitFor(() => {
      expect(
        screen.getByText(/this field may not be blank/i),
      ).toBeInTheDocument();
    });
  });

  test("submits the form and redirects the user on successful sign-up", async () => {
    axios.post.mockResolvedValueOnce({
      data: { user: { username: "testuser", photographer_id: 1 } },
    });

    const mockHistoryPush = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useHistory")
      .mockReturnValue({ push: mockHistoryPush });

    render(
      <Router>
        <SignUpForm />
      </Router>,
    );

    fireEvent.change(screen.getByPlaceholderText("Enter username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm password"), {
      target: { value: "password123" },
    });

    const signUpButton = screen.getByText("Sign Up");
    fireEvent.click(signUpButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("/dj-rest-auth/registration/", {
        username: "testuser",
        password1: "password123",
        password2: "password123",
      });
    });

    expect(mockHistoryPush).toHaveBeenCalledWith("/profile/1");
  });

  test("displays error message on failed sign-up", async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { username: ["This username is already taken."] } },
    });

    render(
      <Router>
        <SignUpForm />
      </Router>,
    );

    fireEvent.change(screen.getByPlaceholderText("Enter username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm password"), {
      target: { value: "password123" },
    });

    const signUpButton = screen.getByText("Sign Up");
    fireEvent.click(signUpButton);

    await waitFor(() => {
      expect(
        screen.getByText("This username is already taken."),
      ).toBeInTheDocument();
    });
  });
});
