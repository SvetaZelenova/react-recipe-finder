import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "antd";

const RecipeItem = () => {
  const params = useParams();
  const [recipeInfo, setRecipeInfo] = useState({});

  useEffect(() => {
    fetchRecipeData(params.recipeId);
  }, [params.recipeId]);
  const fetchRecipeData = async (id) => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const data = await api.json();
    setRecipeInfo(data);
  };

  return (
    <>
      <h1>Recipe {recipeInfo.id}</h1>
      <Link to=".." relative="path">
        Back to all
      </Link>
      <Card title={recipeInfo.title} />
    </>
  );
};

export default RecipeItem;
