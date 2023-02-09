import React from "react";
import Drawer from "@mui/material/Drawer";
import "./Menu.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
const Menu = ({ menu, setMenu }) => {
  return (
    <div>
      <Drawer
        anchor={"top"}
        variant={"temporary"}
        open={menu}
        onClose={() => setMenu(false)}
      >
        <div className="changeit">
          <Button>
            <Link className="bewhiteplz" to={`actors`}>
              Actors
            </Link>
          </Button>
          <Button>
            <Link className="bewhiteplz" to={`movies`}>
              movies
            </Link>
          </Button>
          <Button>
            <Link className="bewhiteplz" to={`users`}>
              users
            </Link>
          </Button>
          <Button onClick={() => setMenu(false)}>close menu</Button>
        </div>
      </Drawer>
    </div>
  );
};

export default Menu;
