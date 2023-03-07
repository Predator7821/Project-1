import mongoose from "mongoose";

const GetRating = new mongoose.Schema({
  rate: {
    type: Number,
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
  trailer: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
});

export const Movie = mongoose.model("Movies", GetMovie);
