import React, { useEffect, useMemo, useState, useContext } from "react";
import "./Home.css";
import {
  Button,
  Card,
  CardMedia,
  Typography,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box } from "@mui/system";
import Tinybox from "../comps/Tinybox";
import { Currentusercontext, Cartcontext } from "../context/Passdata";
import axios from "axios";
const Home = () => {

  const { currentUser, setCurrentUser } = useContext(Currentusercontext);
  const [top, setTop] = useState([]);
  const topmovies = async () => {
    fetch("http://127.0.0.1:8000/api/movies")
      .then((response) => response.json())
      .then((data) => setTop(data));
  };
  useEffect(() => {
    topmovies();
  }, []);
  const ranNum = useMemo(() => parseInt(Math.random() * top.length + 1), [top]);
  const [actor, setActor] = useState(false);
  const bdayactor = async () => {
    const test1 = await fetch("http://127.0.0.1:8000/api/actorsDateOfBirth");
    const test2 = await test1.json();
    if (test2[0] != null) {
      setActor(test2);
    }
  };
  useEffect(() => {
    bdayactor();
  }, []);
  const tinyBoxesArr = [1, 2, 3];
  const toparr = top.filter((i) => i.rating.rate >= 9);
  const ratearr = top.filter((i) => i.rating.count >= 750000);

  const Globalstate = useContext(Cartcontext);
  const dispatch = Globalstate.dispatch;
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
          const clone = [...top];
          const movieIndex = clone.findIndex((mv) => mv._id === res.data._id);
          clone[movieIndex].rating = res.data.rating;
          setTop(clone);
        });
    }
  };
  return (
    <div className="enlarge">
      <Box>
        <h1 className="putmewhereineedtobe">discover somthing random</h1>
        <div className="sides">
          {tinyBoxesArr.map((tinyBox) => {
            return (
              <div className="spacethosethings">
                <Tinybox ranNum={ranNum + tinyBox} top={top} />
              </div>
            );
          })}
        </div>
      </Box>
      <h1 className="putmewhereineedtobe">Top Rated Movies</h1>
      <div className="pop">
        {toparr.map((item) => {
          return (
            <Card sx={{ minWidth: 345, maxWidth: 345, margin: 1 }}>
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
                <Typography>{item.name}</Typography>
                <Button>
                  <a href={item.trailer}>Trailer</a>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <h1 className="putmewhereineedtobe">Fan Choice</h1>
      <div className="pop">
        {ratearr.map((item) => {
          return (
            <Card sx={{ minWidth: 345, maxWidth: 345, margin: 1 }}>
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
                <Typography>{item.name}</Typography>
                <Button>
                  <a href={item.trailer}>Trailer</a>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
      {actor ? (
        <div>
          <h1 className="putmewhereineedtobe">Todays Birthdays</h1>
          <div className="pop">
            {actor.map((item) => {
              return (
                <div className="fixmybdays">
                  <Link to={`/actors/${item._id}`}>
                    <img
                      width={150}
                      height={150}
                      className="smallpfp"
                      src={item.picture}
                      alt=""
                    />
                  </Link>
                  <span>
                    {item.name.first_name} {item.name.last_name}{" "}
                  </span>
                  <span>{item.dob.date}</span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <h1 className="putmewhereineedtobe">
          no one is having a birthday today
        </h1>
      )}
    </div>
  );
};

export default Home;
