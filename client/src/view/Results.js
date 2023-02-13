import React, { useContext, useEffect, useState } from "react";
import { Catsearchcontext, Searchresultscontext } from "../context/Passdata";
import "./Results.css";
const Results = () => {
  const { results, setResults } = useContext(Searchresultscontext);
  const { searchCat, setSearchCat }=useContext(Catsearchcontext);
  let allmap=(false)
  let moviemap=(false)
  let actormap=(false)
  let usermap=(false)

  const [actor, setActor] = useState([]);
  const [movie, setMovie] = useState([]);
  const [user, setUser] = useState([]);
  const getmovies = async () => {
    fetch("http://127.0.0.1:8000/api/movies")
      .then((response) => response.json())
      .then((data) => setActor(data));
  };
  const getactor = async () => {
    fetch("http://127.0.0.1:8000/api/actors")
      .then((response) => response.json())
      .then((data) => setMovie(data));
  };
  const getusers = async () => {
    fetch("http://127.0.0.1:8000/api/users")
      .then((response) => response.json())
      .then((data) => setUser(data));
  };
  if (searchCat === "All") {
      getmovies()
      getactor()
      getusers()
      allmap=true
  }else if(searchCat==="Actors"){
    getactor()
    actormap=true
  }else if(searchCat==="Movies"){
    getmovies()
    moviemap=true
  }else{
    getusers()
    usermap=true
  }
  const allmovies = movie.filter((e) => e.name === results);
  const allusers = user.filter((e)=> e.Username === results)
  const allactors = actor.filter((e)=> e.name === results)
  return(
    <div className="thatfuckingheader makeitfitthecenter">
      {allmap ? 
    (allmovies.map((e)=> {
      return(
        <h1>{e.name}</h1>
      )
    })) +(allusers.map((e)=>{
      return(
        <h1>{e.Username}</h1>
      )
    }))+ (allactors.map((e)=>{
      return(
        <h1>{e.name}</h1>
      )
    })):<div></div>}
    </div>
  );
};

export default Results;
