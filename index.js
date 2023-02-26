import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {
  actorsController,
  singleActorController,
  movieController,
  singleMovieController,
  premiumController,
  singlePremiumController,
  userController,
  singleUserController,
  singleUserProfileController,
  birthdayController,
  movieUpdateController,
  userUpdateController,
  newUserController,
} from "./controllers/Controllers.js";
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

app.get("/api/actors/:actorid", singleActorController);
app.get("/api/movies/:movieid", singleMovieController);
app.get("/api/premiums/:premiumsid", singlePremiumController);
app.get("/api/users/:userid", singleUserController);
app.get("/api/profile/:Username", singleUserProfileController);

app.get("/api/actorsDateOfBirth", birthdayController);

app.put(`/api/movies/:movieid`, movieUpdateController);
app.put(`/api/users/:userid`, userUpdateController);

app.post("/api/users", newUserController);

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
