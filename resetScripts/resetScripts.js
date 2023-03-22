import { movies, premiums } from "../services/Services.js";
export const resetAllRaing=()=>{
  const resetMovieRating = async () => {
  const moviesss = await movies();
  moviesss.forEach((mv) => {
    mv.rating = {
      rate: 0,
      count: 0,
    };
    mv.save();
  });
};
resetMovieRating()
 const resetPremiumRating = async () => {
  const Premiumsss = await premiums();
  Premiumsss.forEach((mv) => {
    mv.rating = {
      rate: 0,
      count: 0,
    };
    mv.save();
  });
};
resetPremiumRating()
}
 
