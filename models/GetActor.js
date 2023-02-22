import mongoose from "mongoose";

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
  
  export const Actor = mongoose.model("Actors", GetActor);