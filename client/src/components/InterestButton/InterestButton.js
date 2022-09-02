import React from "react";
import { Button } from "react-bootstrap";
import "./InterestButton.css";
const InterestButton = (props) => {
  // console.log(props.checkedState)
  // console.log(props.key)
  return (
    <>
      <Button 
      className="interest_btn" 
      onClick={props.onClick}
      >
        <span>{props.icon} {props.interest}</span>
      </Button>
    </>
  );
};

export default InterestButton;
