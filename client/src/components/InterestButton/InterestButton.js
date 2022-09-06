import React from "react";
import { Button } from "react-bootstrap";
import "./InterestButton.css";
const InterestButton = (props) => {
  return (
    <>
      <Button className="interest_btn" onClick={props.onClick}>
        <span>{props.interest}</span>
      </Button>
    </>
  );
};

export default InterestButton;
