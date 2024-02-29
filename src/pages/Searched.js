import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const SearchedRecipes = () => {
  const params = useParams();
  const [foundRecipes, setFoundRecipes] = useState([]);

  useEffect(() => {
    getRecipesByQuery(params.query);
  }, [params.query]);

  const getRecipesByQuery = async (query) => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${query}&number=9`
    );
    const data = await api.json();
    setFoundRecipes(data.results);
  };
  return (
    <>
      <h1>Recipes found</h1>
      <Row gutter={16}>
        {foundRecipes.map((item) => {
          return (
            <Col className="gutter-row" span={6}>
              <Link to={`/recipes/${item.id}`} key={item.id}>
                <Card
                  style={{ marginBottom: 20 }}
                  title={item.title}
                  cover={<img style={{padding: "20px 30px"}} src={item.image} alt={item.title} />}
                />
              </Link>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default SearchedRecipes;
