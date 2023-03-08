import React from "react";
import { Link } from "react-router-dom";

const BirthdayContainer = ({ item }) => {
  return (
    <div className="fixMyBDays">
      <Link to={`/actors/${item._id}`}>
        <img
          width={150}
          height={150}
          className="smallPFP"
          src={item.picture}
          alt=""
        />
      </Link>
      <span>
        {item.name.first_name} {item.name.last_name}{" "}
      </span>
      <span>{item.dob.date}</span>
    </div>
  );
};

export default BirthdayContainer;
