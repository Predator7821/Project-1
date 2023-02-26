import {
  actors,
  singleActor,
  movies,
  singleMovie,
  premiums,
  singlePremium,
  users,
  singleUser,
  birthday,
  Register,
} from "../services/Services.js";
import { filterOnlyTodayBirthDates } from "../utils/dates.js";
import {
  movieAllowedUpdates,
  usersAllowedUpdates,
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
    const movie = await singleMovie(req.params.movieid);
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
    const premiummovie = await singlePremium({
      _id: req.params.premiumsid,
    });
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
    const { movieid } = req.params;
    const movie = await singleMovie({ _id: movieid });
    if (!movie) {
      res.status(404).send({ message: "user does not exist" });
    }
    updates.forEach((update) => (movie[update] = req.body[update]));
    await movie.save();
    res.status(200).send(movie);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
};
