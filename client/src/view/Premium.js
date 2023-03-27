import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import {
  AchiveThePremiumContext,
  CheckPremiumContext,
  CurrentUserContext,
  FlagContext,
  UserDataContext,
  User_IdContext,
} from "../context/Passdata";
import PremiumCardMap from "../comps/PremiumCardMap";
import "./Premium.css";
import { SERVER_URL } from "../constants/const";
import { Button } from "@mui/material";

const Premium = () => {
  const { isPremium, setIsPremium } = useContext(CheckPremiumContext);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { premium, setPremium } = useContext(AchiveThePremiumContext);
  const { userData, setUserData } = useContext(UserDataContext);
  const { userId, setUserId } = useContext(User_IdContext);
  const {flag,setFlag}=useContext(FlagContext)
  const [loading, setLoading] = useState(false);
  const makePrem = true;
  const getPremium = () => {
    setLoading(true);
    axios
      .put(`${SERVER_URL}/api/users/${userId}`, {
        premium: "true",
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("IS_PREMIUM_STORAGE", JSON.stringify(makePrem));
      })
      .finally(setLoading(false));
  };

  useEffect(() => {
    if (!isPremium) {
      const isPrm = JSON.parse(localStorage.getItem("IS_PREMIUM_STORAGE"));
      setIsPremium(isPrm);
    }

    if (!currentUser) {
      const currUser = JSON.parse(localStorage.getItem("CURRENT_USER"));
      setCurrentUser(currUser);
    }
  }, []);
  useEffect(() => {
    if(premium.length===0){
    setLoading(true);
    axios({
      method: "GET",
      url: `${SERVER_URL}/api/premiums`,
    })
      .then((res) => {
        setPremium(res.data);
        setUserData(userData);
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));}
  }, [flag]);
  useEffect(() => {
    const prem = JSON.parse(localStorage.getItem("IS_PREMIUM_STORAGE"));
    setIsPremium(prem);
    const usedat = JSON.parse(localStorage.getItem("USER_DATA_STORAGE"));
    setUserData(usedat);
  }, [userData,isPremium]);
  return (
    <div className="worstHeader goToTheCetner">
      {loading && (
        <img
          src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmVlNWQ3ODMzMjBiOGYwYjAxYjAwYzY1MGQ4NTE0ODJmZGQ5YjQ0YSZjdD1n/2oLtN5SdHX6J4cm9d1/giphy.gif"
          alt=""
        />
      )}
      {isPremium ? (
        <div className="worstHeader">
          <h1 className="placeholder">Premium Movies EB Exclusives</h1>
          <div className="spacer flexer">
            {premium?.map((item) => {
              return <PremiumCardMap item={item} currentUser={currentUser} />;
            })}
          </div>
        </div>
      ) : (
        <div className="centerprem">
          <h1>please register for a premium user</h1>
          <Button onClick={getPremium} variant="contained" color="error">
            Buy Premium
          </Button>
          <h1>after buying please refresh the page</h1>
        </div>
      )}
    </div>
  );
};

export default Premium;
