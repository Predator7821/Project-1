import React from 'react'
import { Button,Card,CardMedia,Typography,CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const MoviePageMapAge = ({handlesubmit,currentUser,cat,setCat,Runtime,ageofmovie,dispatch,setLength,Movietypefilter,bestmovie,length}) => {
  return (
    <>
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
  </>)
}

export default MoviePageMapAge