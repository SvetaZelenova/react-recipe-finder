import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import RecipeItem from "./RecipeItem";

describe("Recipe item", () => {
  describe("initial rendering", () => {
    test("id", () => {
      render(
        <MemoryRouter initialEntries={[`/recipes/345678`]}>
          <Routes>
            <Route path="/recipes/:recipeId" element={<RecipeItem />} />
          </Routes>
        </MemoryRouter>
      );
      const recipeId = screen.getByText("345678");
      expect(recipeId).toBeInTheDocument();
    });
  });
});
