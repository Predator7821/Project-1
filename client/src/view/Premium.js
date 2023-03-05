import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { Checkpremiumcontext, Currentusercontext } from "../context/Passdata";
import PremiumCardMap from "../comps/PremiumCardMap";
import "./Premium.css";

const Premium = () => {
  const { ispremium } = useContext(Checkpremiumcontext);
  const { currentUser } = useContext(Currentusercontext);
  const [premium, setPremium] = useState([]);

  const fetchpremium = async () => {
    fetch("http://127.0.0.1:8000/api/premiums")
      .then((response) => response.json())
      .then((data) => setPremium(data));
  };
  const handlesubmit = (item) => {
    if (item.rating.rate >= 10) {
      alert("this movie is a master piece and you cant change that");
    } else {
      axios
        .put(`http://127.0.0.1:8000/api/premiums/${item._id}`, {
          rating: {
            rate: (item.rating.rate += 0.1),
            count: item.rating.count,
          },
        })
        .then((res) => {
          console.log(res);
          const clone = [...premium];
          const premiumIndex = clone.findIndex((mv) => mv._id === res.data._id);
          clone[premiumIndex].rating = res.data.rating;
          setPremium(clone);
        });
    }
  };
  useEffect(() => {
    fetchpremium();
  }, []);

  return (
    <div className="worstheader gotothecetner">
      {ispremium ? (
        <div className="worstheader">
          <h1 className="placeholder">Premium Movies EB Exclusives</h1>
          <div className="spacer flexer">
            {premium.map((item) => {
              return (
                <PremiumCardMap
                  item={item}
                  currentUser={currentUser}
                  handlesubmit={handlesubmit}
                />
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
