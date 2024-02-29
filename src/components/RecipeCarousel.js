import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Card, Carousel, Col } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RecipeCarousel = ({ type }) => {
  const [foundRecipes, setFoundRecipes] = useState([]);
  useEffect(() => {
    fetchRecipesByCategory(type);
  }, [type]);
  const fetchRecipesByCategory = async (type) => {
    const request =
      type === "random"
        ? `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
        : `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${type}&number=9`;
    const api = await fetch(request);
    const data = await api.json();
    type === "random" ? setFoundRecipes(data.recipes) : setFoundRecipes(data.results);
  };
  const SlickButtonFix = ({ currentSlide, slideCount, children, ...props }) => (
    <span {...props}>{children}</span>
  );
  return (
    <>
      <h2>{type}</h2>
      <Carousel
        slidesToShow={4}
        swipeToSlide={true}
        draggable
        style={{ paddingBottom: 50 }}
        autoplay
        arrows={true}
        prevArrow={
          <SlickButtonFix style={{ width: 50 }}>
            <LeftOutlined style={{ color: "white" }} />
          </SlickButtonFix>
        }
        nextArrow={
          <SlickButtonFix>
            <RightOutlined />
          </SlickButtonFix>
        }
      >
        {foundRecipes.map((item) => {
          return (
            <Col key={item.id} span={4}>
              <Link to={`/recipes/${item.id}`}>
                <Card
                  key={item.id}
                  bordered={true}
                  style={{ width: 240, padding: 10 }}
                  title={item.title}
                  cover={<img src={item.image} alt={item.title} />}
                ></Card>
              </Link>
            </Col>
          );
        })}
      </Carousel>
    </>
  );
};

export default RecipeCarousel;
