import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./SingleUser.css";
import { SERVER_URL } from "../constants/const";

const SingleUser = () => {
  const params = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const userView = async () => {
    setLoading(true);
    fetch(`${SERVER_URL}/api/users/${params.userid}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .finally(setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    userView();
    setLoading(false);
  }, []);
  return (
    <div className="iHateStickyHeaders">
      {loading && (
        <img
          src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmVlNWQ3ODMzMjBiOGYwYjAxYjAwYzY1MGQ4NTE0ODJmZGQ5YjQ0YSZjdD1n/2oLtN5SdHX6J4cm9d1/giphy.gif"
          alt=""
        />
      )}
      <div className="profile">
        <img alt="" height={100} width={100} src={user.pfp} />
      </div>
      <div className="bios">
        <span>{user.Username}</span>
        <span>{user.Bio}</span>
      </div>
    </div>
  );
};

export default SingleUser;
