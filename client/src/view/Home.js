import React, { useEffect, useMemo, useState, useContext } from "react";
import { Box } from "@mui/system";

import Tinybox from "../comps/Tinybox";
import MovieContainer from "../comps/MovieContainer";
import BirthdayContainer from "../comps/BirthdayContainer";
import { Currentusercontext } from "../context/Passdata";
import "./Home.css";

const Home = () => {
  const { currentUser, setCurrentUser } = useContext(Currentusercontext);
  const [top, setTop] = useState([]);
  const [actor, setActor] = useState(false);
  const ranNum = useMemo(() => parseInt(Math.random() * top.length + 1), [top]);
  const tinyBoxesArr = [1, 2, 3];
  const toparr = top.filter((i) => i.rating.rate >= 4);
  const ratearr = top.filter((i) => i.rating.count >= 500);

  const topmovies = async () => {
    fetch("http://127.0.0.1:8000/api/movies")
      .then((response) => response.json())
      .then((data) => setTop(data));
  };

  const bdayactor = async () => {
    fetch("http://127.0.0.1:8000/api/actorsDateOfBirth")
      .then((response) => response.json())
      .then((data) => {
        if (data[0] != null) {
          setActor(data);
        }
      });
  };

  useEffect(() => {
    bdayactor();
    topmovies();
  }, []);
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
          return <MovieContainer currentUser={currentUser} item={item} />;
        })}
      </div>
      <h1 className="putmewhereineedtobe">Fan Choice</h1>
      <div className="pop">
        {ratearr.map((item) => {
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
