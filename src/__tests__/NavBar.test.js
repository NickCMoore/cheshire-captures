import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NavBar from "../components/NavBar";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

describe("NavBar", () => {
  test("renders Navbar with sign-in link when not logged in", async () => {
    render(
      <Router>
        <CurrentUserContext.Provider value={null}>
          <NavBar />
        </CurrentUserContext.Provider>
      </Router>,
    );

    const dropdownToggle = screen.getByRole("button", { name: /user/i });
    fireEvent.click(dropdownToggle);

    const signInLink = await screen.findByRole("link", { name: /sign in/i });
    expect(signInLink).toBeInTheDocument();
  });
});
