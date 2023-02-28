import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import {
  Moviefetchcontext,
  Currentusercontext,
  Cartcontext,
  Movieagecontext,
} from "../context/Passdata";
import Movietypefilter from "../comps/Movietypefilter";
import Runtime from "../comps/Runtime";
import MoviePageMapAge from "../comps/MoviePageMapAge";
import "./MoviePage.css";

const MoviesPage = () => {
  const { bestofdabest, setBestofdabest } = useContext(Moviefetchcontext);
  const { currentUser, setCurrentUser } = useContext(Currentusercontext);
  const { movieAge, setMovieAge } = useContext(Movieagecontext);
  const [movie, setMovie] = useState([]);
  const [bestmovie, setBestmovie] = useState([]);
  const [length, setLength] = useState([1, 1000]);
  const [cat, setCat] = useState("All Movies");
  const Globalstate = useContext(Cartcontext);
  const dispatch = Globalstate.dispatch;

  const FetchMovie = async () => {
    fetch("http://127.0.0.1:8000/api/movies")
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
        setBestmovie(data);
      });
  };

  const onFilterChange = () => {
    if (cat === "All Movies") {
      setBestmovie(
        movie.filter((t) => t.runtime >= length[0] && t.runtime <= length[1])
      );
    } else {
      const filteredmovies = movie.filter(
        (t) =>
          t.category === cat && t.runtime >= length[0] && t.runtime <= length[1]
      );
      setBestmovie(filteredmovies);
    }
  };
  let ageofmovie = movie.filter((e) => e.age < movieAge);

  const ageonFilterChange = () => {
    if (cat === "All Movies") {
      setBestmovie(
        ageofmovie.filter(
          (t) => t.runtime >= length[0] && t.runtime <= length[1]
        )
      );
    } else {
      const filteredmovies = ageofmovie.filter(
        (t) =>
          t.category === cat && t.runtime >= length[0] && t.runtime <= length[1]
      );
      setBestmovie(filteredmovies);
    }
  };
  setBestofdabest(movie);
  useEffect(() => {
    FetchMovie();
  }, []);

  useEffect(() => {
    if (currentUser !== false) {
      ageonFilterChange();
    } else {
      onFilterChange();
    }
  }, [cat, length]);

  const handlesubmit = (item) => {
    if (item.rating.rate >= 10) {
      alert("this movie is a master piece and you cant change that");
    } else {
      axios
        .put(`http://127.0.0.1:8000/api/movies/${item._id}`, {
          rating: {
            rate: (item.rating.rate += 0.1),
            count: item.rating.count,
          },
        })
        .then((res) => {
          console.log(res);
          const clone = [...movie];
          const movieIndex = clone.findIndex((mv) => mv._id === res.data._id);
          clone[movieIndex].rating = res.data.rating;
          setMovie(clone);
        });
    }
  };

  return (
    <div>
      {movieAge ? (
        <div className="spacer sortthefilters">
          <MoviePageMapAge
            handlesubmit={handlesubmit}
            currentUser={currentUser}
            cat={cat}
            setCat={setCat}
            Runtime={Runtime}
            ageofmovie={ageofmovie}
            setLength={setLength}
            Movietypefilter={Movietypefilter}
            bestmovie={bestmovie}
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
            handlesubmit={handlesubmit}
            currentUser={currentUser}
            cat={cat}
            setCat={setCat}
            Runtime={Runtime}
            ageofmovie={ageofmovie}
            setLength={setLength}
            Movietypefilter={Movietypefilter}
            bestmovie={bestmovie}
            length={length}
          />
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
