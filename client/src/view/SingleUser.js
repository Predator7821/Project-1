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
          src={
            "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7a5e48c6-8e81-4f05-a625-29932f3fd54a/dffcdl7-9ef51616-9dcf-4cde-bf93-95a36ddefebb.png/v1/fill/w_894,h_894,q_70,strp/roblox___small_pfp_by_lilly51701_dffcdl7-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcLzdhNWU0OGM2LThlODEtNGYwNS1hNjI1LTI5OTMyZjNmZDU0YVwvZGZmY2RsNy05ZWY1MTYxNi05ZGNmLTRjZGUtYmY5My05NWEzNmRkZWZlYmIucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.N4Yteyk_mzMoYHtjxyasDUaBF4kBcwG2dBoI8LDlkxg"
          }
        />
      </div>
      <Link to={`/profile/${currentUser}`}>got to the real profile</Link>
      <div className="bios">
        <span>{user.Username}</span>
        <span>{user.bio}</span>
      </div>
    </div>
  );
};

export default SingleUser;
