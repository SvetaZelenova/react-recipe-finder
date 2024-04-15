import { render, screen } from "@testing-library/react";
import RecipeCarousel from "./RecipeCarousel";
// import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

describe("Recipe carousel", () => {
  test("renders", async () => {
    render(
      <BrowserRouter>
        <RecipeCarousel type="random" />
      </BrowserRouter>
    );
    const cardElements = await screen.findAllByRole("link");
    expect(cardElements).toHaveLength(4);
  });
});
