import React, { useEffect, useState, useContext } from "react";

import {
  MovieFetchContext,
  CurrentUserContext,
  MovieAgeContext,
} from "../context/Passdata";
import MovieTypeFilter from "../comps/MovieTypeFilter";
import Runtime from "../comps/Runtime";
import MoviePageMapAge from "../comps/MoviePageMapAge";
import "./MoviePage.css";

const MoviesPage = () => {
  const { bestOfDaBest, setBestOfDaBest  } = useContext(MovieFetchContext);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { movieAge, setMovieAge } = useContext(MovieAgeContext);
  const [loading, setLoading]=useState(false)
  const [movie, setMovie] = useState([]);
  const [bestMovie, setBestMovie] = useState([]);
  const [length, setLength] = useState([1, 1000]);
  const [cat, setCat] = useState("All Movies");

  const FetchMovie = async () => {
    setLoading(true)
    fetch("http://127.0.0.1:8000/api/movies")
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
        setBestMovie(data);
      }).finally(setLoading(false));
  };

  const onFilterChange = () => {
    if (cat === "All Movies") {
      setBestMovie(
        movie.filter((t) => t.runtime >= length[0] && t.runtime <= length[1])
      );
    } else {
      const filteredmovies = movie.filter(
        (t) =>
          t.category === cat && t.runtime >= length[0] && t.runtime <= length[1]
      );
      setBestMovie(filteredmovies);
    }
  };
  let ageOfMovie = movie.filter((e) => e.age < movieAge);

  const ageonFilterChange = () => {
    if (cat === "All Movies") {
      setBestMovie(
        ageOfMovie.filter(
          (t) => t.runtime >= length[0] && t.runtime <= length[1]
        )
      );
    } else {
      const filteredmovies = ageOfMovie.filter(
        (t) =>
          t.category === cat && t.runtime >= length[0] && t.runtime <= length[1]
      );
      setBestMovie(filteredmovies);
    }
  };
  setBestOfDaBest(movie);
  useEffect(() => {
    setLoading(true)
    FetchMovie();
    setLoading(false)
  }, []);

  useEffect(() => {
    if (currentUser !== false) {
      ageonFilterChange();
    } else {
      onFilterChange();
    }
  }, [cat, length]);

  return (
    <div>
      {loading && (
        <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmVlNWQ3ODMzMjBiOGYwYjAxYjAwYzY1MGQ4NTE0ODJmZGQ5YjQ0YSZjdD1n/2oLtN5SdHX6J4cm9d1/giphy.gif" alt=""/>
      )}
      {movieAge ? (
        <div className="spacer sortthefilters">
          <MoviePageMapAge
            currentUser={currentUser}
            cat={cat}
            setCat={setCat}
            Runtime={Runtime}
            ageOfMovie={ageOfMovie}
            setLength={setLength}
            MovieTypeFilter={MovieTypeFilter}
            bestMovie={bestMovie}
            length={length}
          />
        </div>
      ) : (
        <div className="spacer sortthefilters">
          <span className="notice">
            *Note some movies may not me age apropriate please register to give
            you the right movies for your age
          </span>
          <MoviePageMapAge
            currentUser={currentUser}
            cat={cat}
            setCat={setCat}
            Runtime={Runtime}
            ageOfMovie={ageOfMovie}
            setLength={setLength}
            MovieTypeFilter={MovieTypeFilter}
            bestMovie={bestMovie}
            length={length}
          />
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
