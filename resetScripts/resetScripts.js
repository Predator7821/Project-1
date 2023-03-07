import { movies } from "../services/Services.js";

export const resetMovieRating = async () => {
  const moviesss = await movies();
  moviesss.forEach((mv) => {
    mv.rating = {
      rate: 0,
      count: 0,
    };
    mv.save();
  });
};
