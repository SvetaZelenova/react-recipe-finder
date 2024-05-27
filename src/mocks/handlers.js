import { rest } from "msw";
const recipes = [
  {
    id: "p1",
    title: "First",
    image: "https://picsum.photos/id/12/2500/1667",
  },
  {
    id: "p2",
    title: "Second",
    image: "https://picsum.photos/id/12/2500/1667",
  },
  {
    id: "p3",
    title: "Third",
    image: "https://picsum.photos/id/12/2500/1667",
  },
  {
    id: "p4",
    title: "Fourth",
    image: "https://picsum.photos/id/12/2500/1667",
  },
];
export const handlers = [
  rest.get(
    `https://api.spoonacular.com/recipes/345678/information`,
    (req, res, ctx) => {
      console.log("Handler", req.method, req.url);
      return res(
        ctx.status(200),
        ctx.json({
          id: "345678",
          title: "Recipe 1",
          image: "https://img.spoonacular.com/recipes/716429-556x370.jpg",
        })
      );
    }
  ),
  rest.get(`https://api.spoonacular.com/recipes/random`, (req, res, ctx) => {
    console.log("Handler", req.method, req.url);
    return res(
      ctx.status(200),
      ctx.json({
        recipes: recipes,
      })
    );
  }),

  rest.get(
    "https://api.spoonacular.com/recipes/complexSearch",
    (req, res, ctx) => {
      const cuisine = req.url.searchParams.get("cuisine");
      switch (cuisine) {
        case "british": {
          return res(ctx.status(200), ctx.json({ results: recipes }));
        }
        case "italian": {
          return res(ctx.status(200), ctx.json({ results: recipes }));
        }
        default:
          return res(ctx.status(404));
      }
    }
  ),
];
