import { fireEvent, render, screen } from "@testing-library/react";
import SearchComponent from "./Search";
import {
  BrowserRouter,
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";
import SearchedRecipes from "../pages/Searched";
// import "@testing-library/jest-dom";

describe("Search", () => {
  test("on initial render", () => {
    render(
      <BrowserRouter>
        <SearchComponent />
      </BrowserRouter>
    );
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("");
  });
  describe("submit", () => {
    test("empty - user isn't redirected to the search page", async () => {
      const router = createMemoryRouter(
        [
          { path: "/", element: <SearchComponent /> },
          { path: "/search/:query", element: <SearchedRecipes /> },
        ],
        { initialEntries: ["/"] }
      );
      render(<RouterProvider router={router} />);
      const btn = screen.getByRole("button");
      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "" } });
      fireEvent.click(btn);
      expect(router.state.location.pathname).not.toContain("search");
    });
  });
});
