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
  return (
    <div className="centersize sticker moveabit">
      <Button>
        <Link to={`/`}>
          <img
            width={64}
            height={32}
            src="https://cdn.logo.com/hotlink-ok/logo-social.png"
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
          <ManageSearchIcon></ManageSearchIcon>
        </Button>
      </Box>
      <Button>LOGOPRO</Button>
      <Button>Watch Later</Button>
      <Button>Login</Button>
      <Lang />
    </div>
  );
};

export default Header;
