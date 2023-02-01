import React, { useContext } from "react";
import Drawer from "@mui/material/Drawer";
import "./Menu.css";
import { Button } from "@mui/material";
const Menu = (menu, setMenu) => {
  return (
    <div>
      <Drawer
        anchor={"top"}
        variant={"temporary"}
        open={menu}
        onClose={() => setMenu(false)}
      >
        <div className="centersize">
          <Button onClick={() => setMenu(false)}>close menu</Button>
        </div>
      </Drawer>
    </div>
  );
};

export default Menu;
