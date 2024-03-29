import {
  actors,
  singleActor,
  movies,
  singleMovieByName,
  singleMovieById,
  premiums,
  singlePremiumById,
  singlePremiumByName,
  users,
  singleUser,
  birthday,
  Register,
  deleteUser,
} from "../services/Services.js";
import { filterOnlyTodayBirthDates } from "../utils/dates.js";
import {
  movieAllowedUpdates,
  usersAllowedUpdates,
  premiumAllowedUpdates,
} from "../constants/constants.js";

export const actorsController = async (req, res) => {
  try {
    const data = await actors();
    res.status(200).send(data);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};

export const singleActorController = async (req, res) => {
  try {
    const actor = await singleActor({ _id: req.params.actorid });
    if (!actor) {
      res.status(404).send({ message: "no such actor in the DB" });
    }
    res.send(actor);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};

export const movieController = async (req, res) => {
  try {
    const data = await movies();
    res.status(200).send(data);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};

export const singleMovieController = async (req, res) => {
  try {
    const movie = await singleMovieByName(req.params.movieid);
    if (!movie) {
      res.status(404).send({ message: "no such movie in the DB" });
    }
    res.send(movie);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};

export const premiumController = async (req, res) => {
  try {
    const data = await premiums();
    res.status(200).send(data);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};

export const singlePremiumController = async (req, res) => {
  try {
    const premiummovie = await singlePremiumByName(req.params.premiumsid);
    if (!premiummovie) {
      res.status(404).send({ message: "no such movie in the DB" });
    }
    res.send(premiummovie);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};

export const userController = async (req, res) => {
  try {
    const data = await users();
    res.status(200).send(data);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};

export const singleUserController = async (req, res) => {
  try {
    const user = await singleUser({ _id: req.params.userid });
    if (!user) {
      res.status(404).send({ message: "That user dose not exsist" });
    }
    res.send(user);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const user = await deleteUser({ _id: req.params.userid });
    if (!user) {
      res.status(404).send({ message: "That user dose not exsist" });
    }
    res.send(user);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};

export const singleUserProfileController = async (req, res) => {
  try {
    const profile = await userProfile({ Username: req.params.Username });
    if (!profile) {
      res.status(404).send({ message: "That user dose not exsist" });
    }
    res.send(profile);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};

export const birthdayController = async (req, res) => {
  try {
    const data = await birthday({});
    const currentActorsBirthDays = filterOnlyTodayBirthDates(data);
    res.send(currentActorsBirthDays);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};

export const newUserController = async (req, res) => {
  const data = Register(
    req.body.Username,
    req.body.Password,
    req.body.fullname,
    req.body.Email,
    req.body.Age
  );
  const val = await data.save();
  res.json(val);
};

export const userUpdateController = async (req, res) => {
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    usersAllowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    res.status(400).send({ message: "Invalid updates" });
  }

  try {
    const { userid } = req.params;
    const user = await singleUser({ _id: userid });
    if (!user) {
      res.status(404).send({ message: "user does not exist" });
    }
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.status(200).send(user);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};

export const movieUpdateController = async (req, res) => {
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    movieAllowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    res.status(400).send({ message: "Invalid updates" });
  }

  try {
    const { movieid, userid } = req.params;
    const movie = await singleMovieById({ _id: movieid });
    if (!movie) {
      res.status(404).send({ message: "movie does not exist" });
    }
    updates.forEach((update) => (movie[update] = req.body[update]));
    const user = await singleUser(userid);
    if (!user) {
      res.status(404).send({ message: "user does not exist" });
    }
    user.MovieRating.push({ Movieid: movieid, rate: req.body.rating.rate });
    await movie.save();
    await user.save();
    res.status(200).send({ movie, user });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};
export const premiumUpdateController = async (req, res) => {
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    premiumAllowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    res.status(400).send({ message: "Invalid updates" });
  }

  try {
    const { premiumsid, userid } = req.params;
    const premiums = await singlePremiumById({ _id: premiumsid });
    if (!premiums) {
      res.status(404).send({ message: "movie does not exist" });
    }
    updates.forEach((update) => (premiums[update] = req.body[update]));
    const user = await singleUser(userid);
    if (!user) {
      res.status(404).send({ message: "user does not exist" });
    }
    user.MovieRating.push({ Movieid: premiumsid, rate: req.body.rating.rate });
    await premiums.save();
    await user.save();
    res.status(200).send({ premiums, user });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};

export const getResults = async (req, res) => {
  try {
    const allMovies = movies();
    const allActors = actors();
    const allUsers = users();
    const allValues = await Promise.all([allMovies, allActors, allUsers]);

    const actorsClone = allValues[1].map((actor) => ({
      ...actor.toObject(),
      name: actor.name.first_name + " " + actor.name.last_name,
    }));

    allValues[1] = actorsClone;
    console.log(actorsClone);
    res.status(200).send({ allValues });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};
