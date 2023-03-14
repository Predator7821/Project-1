import React, { useContext, useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

import SearchCatSelection from "./SearchCatSelection";
import SearchBar from "./SearchBar";
import { LoginContext, CurrentUserContext } from "../context/Passdata";
import Menu from "./Menu";
import "./Header.css";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [menu, setMenu] = useState(false);
  const [temp, setTemp] = useState();

  useEffect(() => {
    const currUser = JSON.parse(localStorage.getItem("CURRENT_USER"));
    setCurrentUser(currUser);
  }, []);
  return (
    <div className="centersize sticker moveAbit">
      <Button>
        <Link to={`/`}>
          <img
            className="stupid"
            width={64}
            height={64}
            src="https://media.discordapp.net/attachments/1027536882483085315/1070765606829297694/istockphoto-1307317595-170667a_copy.jpg"
            alt=""
          />
        </Link>
      </Button>

      <Button onClick={() => setMenu(true)}>menu</Button>
      <Menu menu={menu} setMenu={setMenu} />
      <Box>
        <SearchCatSelection />
        <SearchBar />
        <Button>
          <Link to={"/results"}>
            <ManageSearchIcon className="beWhitePlz"></ManageSearchIcon>
          </Link>
        </Button>
      </Box>
      <Button>
        <Link to={"/premiums"}>
          <img
            className="stupid"
            width={64}
            height={64}
            src="https://cdn.discordapp.com/attachments/1027536882483085315/1073599195715489883/photo-1550353127-b0da3aeaa0ca.jpg"
            alt=""
          />
        </Link>
      </Button>
      {currentUser ? (
        <Button>
          <Link className="pleaseBeWhite" to={`/profile/${currentUser}`}>
            Watch Later
          </Link>
        </Button>
      ) : (
        <Button>
          <Link className="pleaseBeWhite" to={"/login"}>
            Watch Later
          </Link>
        </Button>
      )}

      {isLoggedIn ? (
        <Link className="beWhitePlz" to={`/profile/${currentUser}`}>
          <span>Hello, {currentUser}!</span>
        </Link>
      ) : (
        <Button>
          <Link className="beWhitePlz" to={"login"}>
            Login
          </Link>
        </Button>
      )}
    </div>
  );
};

export default Header;
