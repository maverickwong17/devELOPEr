import React, { Fragment } from "react";
import { ReactComponent as Logo } from "../../devEloper-02.svg";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <div className={classes.header}>
      <span className={classes.logo}>
        <Logo />
      </span>
      <ul>
        <li>
          <a href="/signin" className={classes.sign_in}>
            Sign In
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Header;
