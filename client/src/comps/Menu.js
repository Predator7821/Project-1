import React from "react";
import Drawer from "@mui/material/Drawer";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import "./Menu.css";

const Menu = ({ menu, setMenu }) => {
  return (
    <div>
      <Drawer
        anchor={"top"}
        variant={"temporary"}
        open={menu}
        onClose={() => setMenu(false)}
      >
        <div className="changeIt">
          <Button>
            <Link className="beWhitePlz" to={`actors`}>
              Actors
            </Link>
          </Button>
          <Button>
            <Link className="beWhitePlz" to={`movies`}>
              movies
            </Link>
          </Button>
          <Button>
            <Link className="beWhitePlz" to={`users`}>
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
