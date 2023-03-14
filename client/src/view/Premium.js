import React, { useEffect, useState, useContext } from "react";

import {
  AchiveThePremiumContext,
  CheckPremiumContext,
  CurrentUserContext,
} from "../context/Passdata";
import PremiumCardMap from "../comps/PremiumCardMap";
import "./Premium.css";
import { SERVER_URL } from "../constants/const";

const Premium = () => {
  const { isPremium, setIsPremium } = useContext(CheckPremiumContext);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { premium, setPremium } = useContext(AchiveThePremiumContext);
  const [loading, setLoading] = useState(false);

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
  const fetchPremium = async () => {
    setLoading(true);
    fetch(`${SERVER_URL}/api/premiums`)
      .then((response) => response.json())
      .then((data) => setPremium(data))
      .finally(setLoading(false));
  };
  useEffect(() => {
    setLoading(true);
    fetchPremium();
    setLoading(false);
  }, []);

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
            {premium.map((item) => {
              return <PremiumCardMap item={item} currentUser={currentUser} />;
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
