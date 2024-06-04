import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import RecipesPage from "./pages/Recipes";
import Root from "./pages/Root";
import ErrorPage from "./pages/Error";
import RecipeItem from "./components/RecipeItem";
import SearchedRecipes from "./pages/Searched";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "search/:query", element: <SearchedRecipes /> },
      { path: "recipes", element: <RecipesPage /> },
      { path: "recipes/:recipeId", element: <RecipeItem /> },
    ],
  },
]);
const queryCLient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryCLient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
