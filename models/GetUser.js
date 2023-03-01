import mongoose from "mongoose";

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
    Watchlist:{
      type:Array,
    }
  });
  
  export const User = mongoose.model("Users", GetUser);