import React from "react";
import { Button } from "react-bootstrap";
import "./InterestButton.css";
const InterestButton = (props) => {
  return (
    <>
      <Button className="interest_btn">
        <span>{props.icon}</span>
        <span>{props.interest}</span>
      </Button>
    </>
  );
};

export default InterestButton;
