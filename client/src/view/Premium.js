import {
  Card,
  Typography,
  Button,
  CardContent,
  CardMedia,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Premium.css";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Premium = () => {
  const [premium, setPremium] = useState([]);
  const fetchpremium = async () => {
    fetch("http://127.0.0.1:8000/api/premiums")
      .then((response) => response.json())
      .then((data) => setPremium(data));
  };
  useEffect(() => {
    fetchpremium();
  }, []);
  return (
    <div className="worstheader">
      <h1 className="placeholder">Premium Movies EB Exclusives</h1>
      <div className="spacer flexer">
        {premium.map((item) => {
          return (
            <Card sx={{ minWidth: 345, maxWidth: 345, margin: 5 }}>
              <CardContent>
                <Button>
                  <AddCircleIcon></AddCircleIcon>
                </Button>
              </CardContent>
              <Button>
                <Link to={`/premiums/${item._id}`}>
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
                <Button>watch later</Button>
                <Button>trailer</Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Premium;
