import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
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
    type: Number,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
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

app.get("/api/movies/:movieid", async (req, res) => {
  try {
    const movie = await Movie.findOne({ _id: req.params.movieid });
    if (!movie) {
      res.status(404).send({ message: "no such movie in the DB" });
    }
    res.send(movie);
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

const GetUser = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  pfp: {
    type: String,
  },
  bio: {
    type: String,
  },
  fullname: {
    type: String,
  },
});

const User = mongoose.model("Users", GetUser);

app.get("/api/users", async (req, res) => {
  try {
    const data = await User.find({});
    res.status(200).send(data);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e });
  }
});

app.post("/api/users", async (req, res) => {
  const data = new User({
    Username: req.body.Username,
    Password: req.body.Password,
    fullname: req.body.fullname,
    Email: req.body.Email,
  });
  const val = await data.save();
  res.json(val);
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
