import {
  Card,
  Typography,
  Button,
  CardContent,
  CardMedia,
} from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Premium.css";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Checkpremiumcontext,
  Currentusercontext,
  Cartcontext,
} from "../context/Passdata";
const Premium = () => {
  const [premium, setPremium] = useState([]);
  const { ispremium, setIspremium } = useContext(Checkpremiumcontext);
  const { currentUser, setCurrentUser } = useContext(Currentusercontext);
  const fetchpremium = async () => {
    fetch("http://127.0.0.1:8000/api/premiums")
      .then((response) => response.json())
      .then((data) => setPremium(data));
  };
  useEffect(() => {
    fetchpremium();
  }, []);
  const Globalstate = useContext(Cartcontext);
  const dispatch = Globalstate.dispatch;
  return (
    <div className="worstheader gotothecetner">
      {ispremium ? (
        <div className="worstheader">
          <h1 className="placeholder">Premium Movies EB Exclusives</h1>
          <div className="spacer flexer">
            {premium.map((item) => {
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
                    <Button>trailer</Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ) : (
        <div>please register for a premium user</div>
      )}
    </div>
  );
};

export default Premium;
