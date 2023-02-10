import React, { useState } from "react";
import Menu from "./Menu";
import { Box, Button } from "@mui/material";
import "./Header.css";
import { Link } from "react-router-dom";
import SearchCatSelection from "./SearchCatSelection";
import SearchBar from "./SearchBar";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import Lang from "./Lang";
const Header = () => {
  const [menu, setMenu] = useState(false);
  const [temp, setTemp] = useState(false);
  const search = () => {};
  return (
    <div className="centersize sticker moveabit">
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
        <Button onClick={() => search()}>
          <Link to={"/"}>
            <ManageSearchIcon className="bewhiteplz"></ManageSearchIcon>
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
      <Button>Watch Later</Button>
      {temp ? (
        <h1>you are logged in</h1>
      ) : (
        <Button>
          <Link className="bewhiteplz" to={"login"}>
            Login
          </Link>
        </Button>
      )}
      <Lang />
    </div>
  );
};

export default Header;
