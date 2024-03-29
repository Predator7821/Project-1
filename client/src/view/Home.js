import React, { useEffect, useMemo, useState, useContext } from "react";
import { Box } from "@mui/system";
import axios from "axios";

import Tinybox from "../comps/Tinybox";
import MovieContainer from "../comps/MovieContainer";
import BirthdayContainer from "../comps/BirthdayContainer";
import { CurrentUserContext, UserDataContext } from "../context/Passdata";
import { SERVER_URL } from "../constants/const";
import "./Home.css";

const Home = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { userData, setUserData } = useContext(UserDataContext);
  const [loading, setLoading] = useState(false);
  const [top, setTop] = useState([]);
  const [actor, setActor] = useState(false);
  const ranNum = useMemo(() => parseInt(Math.random() * top.length + 1), [top]);
  const tinyBoxesArr = [1, 2, 3];
  const topArr = top.filter((i) => i.rating.rate >= 4);
  const rateArr = top.filter((i) => i.rating.count >= 10);

  const topmovies = async () => {
    setLoading(true);
    fetch(`${SERVER_URL}/api/movies`)
      .then((response) => response.json())
      .then((data) => setTop(data))
      .finally(setLoading(false));
  };

  const bdayactor = async () => {
    setLoading(true);

    fetch(`${SERVER_URL}/api/actorsDateOfBirth`)
      .then((response) => response.json())
      .then((data) => {
        if (data[0] != null) {
          setActor(data);
        }
      })
      .finally(setLoading(false));
  };

  useEffect(() => {
    const currUser = JSON.parse(localStorage.getItem("CURRENT_USER"));
    setCurrentUser(currUser);
    setLoading(true);
    bdayactor();
    topmovies();
  }, []);
  useEffect(() => {
    const usedat = JSON.parse(localStorage.getItem("USER_DATA_STORAGE"));
    setUserData(usedat);
  }, [userData]);
  return (
    <div className="enlarge">
      {loading && (
        <>
          <img
            className="loading"
            src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmVlNWQ3ODMzMjBiOGYwYjAxYjAwYzY1MGQ4NTE0ODJmZGQ5YjQ0YSZjdD1n/2oLtN5SdHX6J4cm9d1/giphy.gif"
            alt=""
          />
        </>
      )}
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
        {topArr.map((item) => {
          return <MovieContainer currentUser={currentUser} item={item} />;
        })}
      </div>
      <h1 className="putmewhereineedtobe">Fan Choice</h1>
      <div className="pop">
        {rateArr.map((item) => {
          return (
            <>
              <MovieContainer currentUser={currentUser} item={item} />
            </>
          );
        })}
      </div>
      {actor ? (
        <div>
          <h1 className="putmewhereineedtobe">Todays Birthdays</h1>
          <div className="pop">
            {actor.map((item) => {
              return <BirthdayContainer item={item} />;
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
