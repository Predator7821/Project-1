import React, { useEffect, useState, useContext } from "react";
import ActorResultMap from "../comps/ActorResultMap";
import MovieResultMap from "../comps/MovieResultMap";
import UserResultMap from "../comps/UserResultMap";
import { Catsearchcontext, Searchresultscontext } from "../context/Passdata";

import "./Results.css";

const Results = () => {
  const { results } = useContext(Searchresultscontext);
  const { searchCat } = useContext(Catsearchcontext);
  const [activeCategory, setActiveCategory] = useState([]);
  const [movies, setMovies] = useState([]);
  const [actors, setActors] = useState([]);
  const [users, setUsers] = useState([]);

  const getAllResults = async () => {
    fetch("http://localhost:8000/api/allDataBaseEnterys")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data?.allValues[0]);
        setActors(data?.allValues[1]);
        setUsers(data?.allValues[2]);
      });
  };

  useEffect(() => {
    if (searchCat === "Actors") {
      setActiveCategory(
        results === ""
          ? actors
          : actors.filter((e) =>
              e.name.first_name
                .toLowerCase()
                .includes(
                  results.toLowerCase() ||
                    e.name.last_name
                      .toLowerCase()
                      .includes(results.toLowerCase())
                )
            )
      );
    } else if (searchCat === "Movies") {
      setActiveCategory(
        results === ""
          ? movies
          : movies.filter((e) =>
              e.name.toLowerCase().includes(results.toLowerCase())
            )
      );
    } else if (searchCat === "Users") {
      setActiveCategory(
        results === ""
          ? users
          : users.filter((e) =>
              e.Username.toLowerCase().includes(results.toLowerCase())
            )
      );
    }
  }, [searchCat, results, movies, actors, users]);

  useEffect(() => {
    getAllResults();
  }, []);

  useEffect(() => {
    console.log(searchCat, activeCategory);
  }, [searchCat]);
  return (
    <div className="thatfuckingheader makeitfitthecenter organizedcards">
      {activeCategory.map((e) => {
        return searchCat === "Users" ? (
          <UserResultMap e={e} />
        ) : searchCat === "Movies" ? (
          <MovieResultMap e={e} />
        ) : searchCat === "Actors" ? (
          <ActorResultMap e={e} />
        ) : (
          <>error</>
        );
      })}
    </div>
  );
};

export default Results;
