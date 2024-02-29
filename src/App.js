import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import RecipesPage from "./pages/Recipes";
import Root from "./pages/Root";
import ErrorPage from "./pages/Error";
import RecipeItem from "./components/RecipeItem";
import SearchedRecipes from "./pages/Searched";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "search/:query", element: <SearchedRecipes />},
      { path: "recipes", element: <RecipesPage /> },
      { path: "recipes/:recipeId", element: <RecipeItem /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
