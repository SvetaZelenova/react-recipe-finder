import { fireEvent, render, screen } from "@testing-library/react";
import SearchComponent from "./Search";
import {
  BrowserRouter,
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";
import SearchedRecipes from "../pages/Searched";

// const mockUseNavigate = jest.fn();
// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   useNavigate: () => mockUseNavigate,
// }));

describe("Search", () => {
  test("on initial render", () => {
    render(
      <BrowserRouter>
        <SearchComponent />
      </BrowserRouter>
    );
    const input = screen.getByRole("textbox");
    expect(input.value).toBe("");
  });
  test("on submit empty search user isn't redirected to the search page", async () => {
    const router = createMemoryRouter(
      [
        { path: "/", element: <SearchComponent /> },
        { path: "/search/:query", element: <SearchedRecipes /> },
      ],
      { initialEntries: ["/"] }
    );
    render(<RouterProvider router={router} />);
    // render(
    //   <MemoryRouter initialEntries={["/"]}>
    //     <Routes>
    //       <Route path="/" element={<HomePage />} />
    //       <Route path="search/:query" element={<SearchedRecipes />} />
    //     </Routes>
    //   </MemoryRouter>
    // );
    const btn = screen.getByRole("button");
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(btn);
    expect(router.state.location.pathname).not.toContain("search");
  });
});
