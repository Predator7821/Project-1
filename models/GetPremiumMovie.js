import mongoose from "mongoose";

const GetPremiumRating = new mongoose.Schema({
  rate: {
    type: Array,
  },
  count: {
    type: Number,
    required: true,
  },
});

const GetPremiumMovie = new mongoose.Schema({
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
    type: GetPremiumRating,
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
});

export const PremiumMovie = mongoose.model("Premiums", GetPremiumMovie);
