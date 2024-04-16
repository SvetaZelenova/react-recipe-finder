import { render, screen } from "@testing-library/react";

import MainNav from "./MainNavigation";
import { BrowserRouter } from "react-router-dom";

describe("Navigation", () => {
  test("initial render", () => {
    render(
      <BrowserRouter>
        <MainNav />
      </BrowserRouter>
    );
    const homeListItem = screen.getByRole("link", { name: /home/i });
    const recipesListItem = screen.getByRole("link", { name: /recipes/i });
    expect(homeListItem).toBeInTheDocument();
    expect(recipesListItem).toBeInTheDocument();
  });
});
