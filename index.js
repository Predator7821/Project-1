import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const { PORT, DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

const app = express();

app.use(express.json());
app.use(cors());
mongoose.set("strictQuery", true);
app.use(express.static("client/build"));

// אובייקט
const Actor_Name = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
});
const actordob = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
}); // מקשר אותו לפה
const GetActor = new mongoose.Schema({
  name: {
    type: Actor_Name,
  },
  dob: {
    type: actordob,
  },
  picture: {
    type: String,
    required: true,
  },
  biography: {
    type: String,
    required: true,
  },
});

const Actor = mongoose.model("Actors", GetActor);

app.get("/api/actors", async (req, res) => {
  try {
    const data = await Actor.find({});
    res.status(200).send(data);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
});

const GetRating = new mongoose.Schema({
  rate: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

const GetMovie = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  rating: {
    type: GetRating,
    required: true,
  },
  runtime: {
    tppe: Number,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
});

const Movie = mongoose.model("Movies", GetMovie);

app.get("/api/movies", async (req, res) => {
  try {
    const data = await Movie.find({});
    res.status(200).send(data);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
});

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/server/build/index.html");
});

mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
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
