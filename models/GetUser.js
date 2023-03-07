import mongoose from "mongoose";

const MovieRated = new mongoose.Schema({
  Movieid: {
    type: String,
  },
  rate: {
    type: Number,
  },
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
    unique: true,
  },
  pfp: {
    type: String,
  },
  Bio: {
    type: String,
  },
  fullname: {
    type: String,
  },
  premium: {
    type: Boolean,
  },
  Age: {
    type: Number,
    required: true,
  },
  Watchlist: {
    type: [String],
    default: [],
  },
  MovieRating: {
    type: [MovieRated],
  },
});

export const User = mongoose.model("Users", GetUser);
