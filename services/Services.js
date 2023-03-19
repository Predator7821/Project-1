import { Actor } from "../models/GetActor.js";
import { Movie } from "../models/GetMovie.js";
import { PremiumMovie } from "../models/GetPremiumMovie.js";
import { User } from "../models/GetUser.js";

export const actors = () => {
  return Actor.find({});
};

export const singleActor = (_id) => {
  return Actor.findOne({ _id: _id });
};

export const movies = () => {
  return Movie.find({});
};

export const singleMovie = (name) => {
  return Movie.findOne({ name: name });
};

export const premiums = () => {
  return PremiumMovie.find({});
};

export const singlePremium = (name) => {
  return PremiumMovie.findOne({ name: name });
};

export const users = () => {
  return User.find({});
};

export const singleUser = (_id) => {
  return User.findOne({ _id: _id });
};
export const deleteUser = (_id) => {
  return User.findOneAndDelete({ _id: _id });
};
export const userProfile = (_id) => {
  return User.findOne({ _id: _id });
};

export const birthday = () => {
  return Actor.find({});
};

export const Register = (Username, Password, fullname, Email, Age) => {
  return new User({
    Username: Username,
    Password: Password,
    fullname: fullname,
    Email: Email,
    Age: Age,
  });
};
