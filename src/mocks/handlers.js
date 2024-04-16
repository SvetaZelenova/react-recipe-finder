import { rest } from "msw";
const results = [
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
  rest.get(`https://api.spoonacular.com/recipes/random`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        recipes: results,
      })
    );
  }),

  rest.get(
    "https://api.spoonacular.com/recipes/complexSearch",
    (req, res, ctx) => {
      const cuisine = req.url.searchParams.get("cuisine");
      switch (cuisine) {
        case "british": {
          return res(ctx.status(200), ctx.json({ results: results }));
        }
        case "italian": {
          return res(ctx.status(200), ctx.json({ results: results }));
        }
        default:
          return res(ctx.status(404));
      }
    }
  ),
];
