import { render, screen } from "@testing-library/react";
import RecipeCarousel from "./RecipeCarousel";
import { BrowserRouter } from "react-router-dom";

describe("Recipe carousel", () => {
  describe("initial rendering", () => {
    test("random", async () => {
      render(
        <BrowserRouter>
          <RecipeCarousel type="random" />
        </BrowserRouter>
      );
      const cardElements = await screen.findAllByRole("link");
      expect(cardElements).toHaveLength(4);
    });
    test("british", async () => {
      render(
        <BrowserRouter>
          <RecipeCarousel type="british" />
        </BrowserRouter>
      );
      const cardElements = await screen.findAllByRole("link");
      expect(cardElements).toHaveLength(4);
    });
    test("italian", async () => {
      render(
        <BrowserRouter>
          <RecipeCarousel type="italian" />
        </BrowserRouter>
      );
      const cardElements = await screen.findAllByRole("link");
      expect(cardElements).toHaveLength(4);
    });
    test("together: randome, british & italian", async () => {
      render(
        <BrowserRouter>
          <RecipeCarousel type="random" />
          <RecipeCarousel type="british" />
          <RecipeCarousel type="italian" />
        </BrowserRouter>
      );
      const cardElements = await screen.findAllByRole("link");
      expect(cardElements).toHaveLength(12);
    });
  });
});
