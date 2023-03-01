import React, { useContext,useState } from 'react'
import { Button,Card,CardMedia,Typography,CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import axios from 'axios';

import { User_idcontext } from '../context/Passdata';
const MoviePageMapAge = ({handlesubmit,currentUser,cat,setCat,Runtime,ageofmovie,dispatch,setLength,Movietypefilter,bestmovie,length}) => {
  const  {userid, setUserid}=useContext(User_idcontext)
  const [userData, setUserData] = useState({
    Watchlist: [],
  });
  const addtowatch = async(item)=>{
    const Watchlist=item.name
    axios
      .put(`http://127.0.0.1:8000/api/users/${userid}`, {
        Watchlist: userData.Watchlist,
      })
      .then((res) => {});
  }
  return (
    <>
      <div className="filtersorter">
        <Movietypefilter cat={cat} setCat={setCat} ageofmovie={ageofmovie} />
        <Runtime length={length} setLength={setLength} />
      </div>
      <div className="flexer">
        {bestmovie.map((item) => {
          return (
            <MovieContainer
              item={item}
              currentUser={currentUser}
              actionFunc={handlesubmit}
            />
          );
        })}
      </div>
    </>
  );
};

export default MoviePageMapAge;
