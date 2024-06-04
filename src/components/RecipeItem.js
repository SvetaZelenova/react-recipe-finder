import { Link, useParams } from "react-router-dom";
import { Alert, Card } from "antd";
import useFetch from "../hooks/useFetch";
import { useCallback } from "react";

const RecipeItem = () => {
  const { recipeId } = useParams();
  const fetchRecipeData = useCallback(async (id) => {
    const fetchUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`;
    const response = await fetch(fetchUrl);
    if (!response.ok) {
      throw Error(`couldn't fetch the data. please try again`);
    }
    const data = await response.json();
    return data;
  }, []);

  const { data: recipeInfo, error, isError, isPending } = useFetch(
    fetchRecipeData,
    recipeId,
    `recipe-${recipeId}`
  );

  if (isError) {
    return <Alert message="Error" description={error.message} type="error" showIcon />;
  }
  if (isPending) {
    return <p>Pending...</p>
  }
  return (
    recipeInfo && (
      <>
        <h1>Recipe {recipeInfo.id}</h1>
        <Link to=".." relative="path">
          Back to all
        </Link>
        <Card title={recipeInfo.title} />
      </>
    )
  );
};

export default RecipeItem;
