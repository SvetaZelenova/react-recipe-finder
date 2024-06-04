import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Alert, Card, Carousel, Col } from "antd";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useCallback } from "react";

const RecipeCarousel = ({ type }) => {
  const fetchRecipesByCategory = useCallback( async (type) => {
    const url =
      type === "random"
        ? `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
        : `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${type}&number=9`;
    const response = await fetch(url);
    if (!response.ok) {
      throw Error(`couldn't fetch the data. please try again`);
    }
    const data = await response.json();
    return type === "random" ? data.recipes : data.results;
  }, []);

  const { data: foundRecipes, error, isPending, isError } = useFetch(
    fetchRecipesByCategory,
    type,
    `recipe-category-${type}`
  );
  const SlickButtonFix = ({ currentSlide, slideCount, children, ...props }) => (
    <span {...props}>{children}</span>
  );
  if (isError) {
    return <Alert message="Error" description={error.message} type="error" showIcon />;
  }
  if (isPending) {
    return <p>Pending...</p>
  }
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
