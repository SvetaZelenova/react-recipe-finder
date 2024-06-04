import { Alert, Card, Col, Row } from "antd";
import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { apiKey } from "../constants/constants";
import { useCallback } from "react";

const SearchedRecipes = () => {
  const { query } = useParams();

  const getRecipesByQuery = useCallback(async (query) => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&number=9`
    );
    if (!response.ok) {
      throw Error(`couldn't fetch the data. please try again`);
    }
    const data = await response.json();
    return data.results;
  }, []);

  const {
    error,
    data: foundRecipes,
    isPending,
    isError,
  } = useFetch(getRecipesByQuery, query, `search-${query}`);

  if (isError) {
    return (
      <Alert
        message="Error"
        description={error.message}
        type="error"
        showIcon
      />
    );
  }

  if (isPending) {
    return <p>Pending...</p>;
  }
  return (
    <>
      <h1>Recipes found</h1>
      {foundRecipes && (
        <Row gutter={16}>
          {foundRecipes.map((item) => {
            return (
              <Col className="gutter-row" span={6} key={item.id}>
                <Link to={`/recipes/${item.id}`} key={item.id}>
                  <Card
                    key={item.id}
                    style={{ marginBottom: 20 }}
                    title={item.title}
                    cover={
                      <img
                        style={{ padding: "20px 30px" }}
                        src={item.image}
                        alt={item.title}
                      />
                    }
                  />
                </Link>
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default SearchedRecipes;
