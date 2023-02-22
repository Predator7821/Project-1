import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import "./SingleUser.css";
import { Currentusercontext } from "../context/Passdata";
const SingleUser = () => {
  const { currentUser, setCurrentUser } = useContext(Currentusercontext);
  const params = useParams();
  const [user, setUser] = useState({});
  const userview = async () => {
    const test1 = await fetch(
      `http://127.0.0.1:8000/api/users/${params.userid}`
    );
    const test2 = await test1.json();
    setUser(test2);
  };
  useEffect(() => {
    userview();
  }, []);
  return (
    <div className="ihatestickyheaders">
      <div className="profile">
        <img
          alt=""
          height={100}
          width={100}
          src={user.pfp}
        />
      </div>
      <div className="bios">
        <span>{user.Username}</span>
        <span>{user.Bio}</span>
      </div>
    </div>
  );
};

export default SingleUser;
