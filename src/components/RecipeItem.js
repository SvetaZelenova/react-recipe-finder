import { Link, useParams } from "react-router-dom";
import { Alert, Card } from "antd";
import useFetch from "../hooks/useFetch";
import { useCallback } from "react";

const RecipeItem = () => {
  const { recipeId } = useParams();

  const fetchRecipeData = useCallback(async (id) => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    if (!response.ok) {
      throw Error(`couldn't fetch the data. please try again`);
    }
    const data = response.json();
    return data;
  }, []);

  const { fetchedData: recipeInfo, error } = useFetch(
    fetchRecipeData,
    recipeId
  );

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
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
