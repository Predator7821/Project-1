import React, { useEffect, useState, useContext } from "react";
import ActorResultMap from "../comps/ActorResultMap";
import MovieResultMap from "../comps/MovieResultMap";
import UserResultMap from "../comps/UserResultMap";
import { CatSearchContext, SearchResultsContext } from "../context/Passdata";

import "./Results.css";

const Results = () => {
  const { results } = useContext(SearchResultsContext);
  const { searchCat } = useContext(CatSearchContext);
  const [loading, setLoading]=useState(false)
  const [activeCategory, setActiveCategory] = useState([]);
  const [movies, setMovies] = useState([]);
  const [actors, setActors] = useState([]);
  const [users, setUsers] = useState([]);

  const getAllResults = async () => {
    setLoading(true)
    fetch("http://localhost:8000/api/allDataBaseEnterys")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data?.allValues[0]);
        setActors(data?.allValues[1]);
        setUsers(data?.allValues[2]);
      }).finally(setLoading(false));
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
    setLoading(true)
    getAllResults();
    setLoading(false)
  }, []);

  useEffect(() => {
    console.log(searchCat, activeCategory);
  }, [searchCat]);
  return (
    
    <div className="ThatFuckingHeader makeItFitTheCenter organizedCards">
      {loading &&(
        <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmVlNWQ3ODMzMjBiOGYwYjAxYjAwYzY1MGQ4NTE0ODJmZGQ5YjQ0YSZjdD1n/2oLtN5SdHX6J4cm9d1/giphy.gif" alt=""/>
      )}
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
