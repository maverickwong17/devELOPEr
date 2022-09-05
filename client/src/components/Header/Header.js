import React, { Fragment } from "react";
import { ReactComponent as Logo } from "../../devEloper-02.svg";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = (props) => {
  const logoutHandler = (e) => {
    e.preventDefault();
    Auth.logout();
    window.location.replace("/");
  };
  return (
    <div className="header">
          <a href='/swipe' className="logo">
            <Logo />
          </a>
      {Auth.loggedIn() ? (
        <a href="/signin" className="sign_in" onClick={logoutHandler}>
          sign out
        </a>
      ) : (
        <a href="/signin" className="sign_in">
          sign in
        </a>
      )}
    </div>
  );
};

export default Header;
