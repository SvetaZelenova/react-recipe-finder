import RecipeCarousel from "../components/RecipeCarousel";

const RecipesPage = () => {
  return (
    <>
      <h1>All recipes!</h1>
      <RecipeCarousel type={"random"} />
      <RecipeCarousel type={"british"} />
      <RecipeCarousel type={"italian"} />
    </>
  );
};

export default RecipesPage;
