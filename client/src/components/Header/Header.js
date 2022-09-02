import React, { Fragment } from "react";
import { ReactComponent as Logo } from "../../devEloper-02.svg";
import Auth from "../../utils/auth";
import classes from "./Header.module.css";

const Header = (props) => {
  const logoutHandler = (e) => {
    e.preventDefault();
    Auth.logout();
    window.location.replace("/");
  };
  return (
    <div className={classes.header}>
      <span className={classes.logo}>
        <Logo />
      </span>

      {Auth.loggedIn() ? (
        <a href="/signin" className={classes.sign_in} onClick={logoutHandler}>
          sign out
        </a>
      ) : (
        <a href="/signin" className={classes.sign_in}>
          sign in
        </a>
      )}
    </div>
  );
};

export default Header;
