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
} from "../context/Passdata";
import Movietypefilter from "../comps/Movietypefilter";
import Moviesortfilter from "../comps/Moviesortfilter";
import Runtime from "../comps/Runtime";
const MoviesPage = () => {
  const { bestofdabest, setBestofdabest } = useContext(Moviefetchcontext);
  const { currentUser, setCurrentUser } = useContext(Currentusercontext);
  const [movie, setMovie] = useState([]);
  const [bestmovie, setBestmovie] = useState([]);
  const [length, setLength] = useState([1, 1000]);
  const [cat, setCat] = useState("All Movies");
  const [typecat, setTypecat] = useState("All types");
  const FetchMovie = async () => {
    const test1 = await fetch("http://127.0.0.1:8000/api/movies");
    const test2 = await test1.json();
    setMovie(test2);
  };
  setBestofdabest(movie);
  useEffect(() => {
    FetchMovie();
  }, []);

  const onFilterChange = () => {
    if (cat === "All Movies" && typecat === "All types") {
      setBestmovie(
        movie.filter((t) => t.runtime >= length[0] && t.runtime <= length[1])
      );
    } else {
      const filteredmovies = movie.filter(
        (t) =>
          t.category === cat &&
          t.runtime >= length[0] &&
          t.runtime <= length[1] &&
          t.type === typecat
      );
      setBestmovie(filteredmovies);
    }
  };
  useEffect(() => {
    onFilterChange();
  }, [cat, length, typecat]);
  const Globalstate = useContext(Cartcontext);
  const dispatch = Globalstate.dispatch;
  return (
    <div className="spacer sortthefilters">
      <div className="filtersorter">
        <Movietypefilter
          onFilterChange={onFilterChange}
          cat={cat}
          setCat={setCat}
          movie={movie}
        />
        <Moviesortfilter
          onFilterChange={onFilterChange}
          typecat={typecat}
          setTypecat={setTypecat}
        />
        <Runtime
          length={length}
          setLength={setLength}
          onFilterChange={onFilterChange}
          movie={movie}
        />
      </div>
      <div className="flexer">
        {movie.map((item) => {
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
  );
};

export default MoviesPage;
