import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import {
  Moviefetchcontext,
  Currentusercontext,
  Cartcontext,
  Movieagecontext,
} from "../context/Passdata";
import Movietypefilter from "../comps/Movietypefilter";
import Runtime from "../comps/Runtime";
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
          <div className="filtersorter">
            <Movietypefilter
              cat={cat}
              setCat={setCat}
              ageofmovie={ageofmovie}
            />
            <Runtime length={length} setLength={setLength} />
          </div>
          <div className="flexer">
            {bestmovie.map((item) => {
              return (
                <Card sx={{ minWidth: 345, maxWidth: 345, margin: 5 }}>
                  <CardContent>
                    {currentUser ? (
                      <Button
                        onClick={() => dispatch({ type: "ADD", payload: item })}
                      >
                        <AddCircleIcon></AddCircleIcon>
                      </Button>
                    ) : (
                      <Button>
                        <Link to={"/login"}>
                          <AddCircleIcon></AddCircleIcon>
                        </Link>
                      </Button>
                    )}
                  </CardContent>
                  <Button>
                    <Link to={`/movies/${item._id}`}>
                      <CardMedia
                        component="img"
                        alt="green iguana"
                        height="500"
                        image={item.picture}
                      />
                    </Link>
                  </Button>

                  <CardContent>
                    <Typography>
                      <StarIcon></StarIcon>
                      {item.rating.rate.toFixed(1)}
                    </Typography>
                    <Typography>{item.name}</Typography>
                    <Typography>
                      {currentUser ? (
                        <Button onClick={() => handlesubmit(item)}>
                          <StarBorderIcon></StarBorderIcon>
                        </Button>
                      ) : (
                        <Button>
                          <Link to={"/login"}>
                            <StarBorderIcon></StarBorderIcon>
                          </Link>
                        </Button>
                      )}
                    </Typography>
                    <Button>
                      <a href={item.trailer}>Trailer</a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="spacer sortthefilters">
          <span className="notice">
            *Note some movies may not me age apropriate please register to give
            you the right movies for your age
          </span>
          <div className="filtersorter">
            <Movietypefilter cat={cat} setCat={setCat} movie={movie} />
            <Runtime length={length} setLength={setLength} movie={movie} />
          </div>
          <div className="flexer">
            {bestmovie.map((item) => {
              return (
                <Card sx={{ minWidth: 345, maxWidth: 345, margin: 5 }}>
                  <CardContent>
                    {currentUser ? (
                      <Button
                        onClick={() => dispatch({ type: "ADD", payload: item })}
                      >
                        <AddCircleIcon></AddCircleIcon>
                      </Button>
                    ) : (
                      <Button>
                        <Link to={"/login"}>
                          <AddCircleIcon></AddCircleIcon>
                        </Link>
                      </Button>
                    )}
                  </CardContent>
                  <Button>
                    <Link to={`/movies/${item._id}`}>
                      <CardMedia
                        component="img"
                        alt="green iguana"
                        height="500"
                        image={item.picture}
                      />
                    </Link>
                  </Button>

                  <CardContent>
                    <Typography>
                      <StarIcon></StarIcon>
                      {item.rating.rate}
                    </Typography>
                    <Typography>{item.name}</Typography>
                    <Typography>
                      {currentUser ? (
                        <Button onClick={handlesubmit}>
                          <StarBorderIcon></StarBorderIcon>
                        </Button>
                      ) : (
                        <Button>
                          <Link to={"/login"}>
                            <StarBorderIcon></StarBorderIcon>
                          </Link>
                        </Button>
                      )}
                    </Typography>
                    <Button>
                      <a href={item.trailer}>Trailer</a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
