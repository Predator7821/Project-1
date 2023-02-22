import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {
  movieAllowedUpdates,
  usersAllowedUpdates,
} from "./constants/constants.js";
import { filterOnlyTodayBirthDates } from "./utils/dates.js";
import { actorsController,movieController,singleMovieController,premiumController,userController } from "./controllers/Controllers.js";
dotenv.config();
const {
  PORT,
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_NAME,
  DB_HOST2,
  DB_NAME2,
  DB_PASS2,
  DB_USER2,
} = process.env;
const app = express();

app.use(express.json());
app.use(cors());
mongoose.set("strictQuery", true);
app.use(express.static("client/build"));

app.get("/api/actors", actorsController);
app.get("/api/movies", movieController);
app.get("/api/premiums", premiumController);
app.get("/api/users", userController);

app.get("/api/actorsDateOfBirth", async (req, res) => {
  try {
    const data = await Actor.find({});
    const currentActorsBirthDays = filterOnlyTodayBirthDates(data);
    res.send(currentActorsBirthDays);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
});

app.get("/api/movies/:movieid", singleMovieController);

app.get("/api/premiums/:premiumsid", async (req, res) => {
  try {
    const premiummovie = await PremiumMovie.findOne({
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
});

app.get("/api/actors/:actorid", async (req, res) => {
  try {
    const actor = await Actor.findOne({ _id: req.params.actorid });
    if (!actor) {
      res.status(404).send({ message: "no such actor in the DB" });
    }
    res.send(actor);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
});

app.get("/api/users/:userid", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userid });
    if (!user) {
      res.status(404).send({ message: "That user dose not exsist" });
    }
    res.send(user);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
});

app.get("/api/profile/:Username", async (req, res) => {
  try {
    const profile = await User.findOne({ Username: req.params.Username });
    if (!profile) {
      res.status(404).send({ message: "That user dose not exsist" });
    }
    res.send(profile);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
});

app.post("/api/users", async (req, res) => {
  const data = User({
    Username: req.body.Username,
    Password: req.body.Password,
    fullname: req.body.fullname,
    Email: req.body.Email,
    Age: req.body.Age,
  });
  const val = await data.save();
  res.json(val);
});
app.put(`/api/users/:userid`, async (req, res) => {
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    usersAllowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    res.status(400).send({ message: "Invalid updates" });
  }

  try {
    const { userid } = req.params;
    const user = await User.findOne({ _id: userid });
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
});
app.put(`/api/movies/:movieid`, async (req, res) => {
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    movieAllowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    res.status(400).send({ message: "Invalid updates" });
  }

  try {
    const { movieid } = req.params;
    const movie = await Movie.findOne({ _id: movieid });
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
});
mongoose.connect(
  `mongodb+srv://${DB_USER2}:${DB_PASS2}@${DB_HOST2}/${DB_NAME2}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    app.listen(PORT, () => {
      console.log("err", err);
      console.log("i am listening on port " + PORT);
    });
  }
);
