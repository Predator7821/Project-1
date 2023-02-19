import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./MoviePage.css";
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
const MoviesPage = () => {
  const { bestofdabest, setBestofdabest } = useContext(Moviefetchcontext);
  const { currentUser, setCurrentUser } = useContext(Currentusercontext);
  const { movieAge, setMovieAge } = useContext(Movieagecontext);
  const [movie, setMovie] = useState([]);
  const [bestmovie, setBestmovie] = useState([]);
  const [length, setLength] = useState([1, 1000]);
  const [cat, setCat] = useState("All Movies");
  const FetchMovie = async () => {
    const test1 = await fetch("http://127.0.0.1:8000/api/movies");
    const test2 = await test1.json();
    setMovie(test2);
    setBestmovie(test2);
  };
  setBestofdabest(movie);
  useEffect(() => {
    FetchMovie();
  }, []);

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
  useEffect(() => {
    if (currentUser != false) {
      ageonFilterChange();
    } else {
      onFilterChange();
    }
  }, [cat, length]);
  const Globalstate = useContext(Cartcontext);
  const dispatch = Globalstate.dispatch;
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
                      {item.rating.rate}
                    </Typography>
                    <Typography>{item.name}</Typography>
                    <Typography>
                      <Button>
                        <StarBorderIcon></StarBorderIcon>
                      </Button>
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
                      <Button>
                        <StarBorderIcon></StarBorderIcon>
                      </Button>
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
