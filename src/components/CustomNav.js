import React from "react";
import "./CustomNav.css";
import HamburgerDrawer from "./HamburgerDrawer";
import { Typography } from "@material-ui/core";

const CustomNav = ({ setCategory, setKeywordExist }) => {
  return (
    <div className="nav">
      <div className="menu">
        <HamburgerDrawer
          setCategory={setCategory}
          setKeywordExist={setKeywordExist}
        />
      </div>

      <Typography variant="h6">NEWS 247</Typography>
    </div>
  );
};

export default CustomNav;
