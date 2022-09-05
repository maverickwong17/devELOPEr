import React from "react";
import { Button } from "react-bootstrap";
import "./InterestButton.css";
const InterestButton = (props) => {
  // console.log(props.checkedState)
  // console.log(props.disabled)

  return (
    <>
      <Button
        className="interest_btn"
        onClick={props.onClick}
        // disabled={props.disabled ? true : false}
      >
        <span>{props.interest}</span>
      </Button>
    </>
  );
};

export default InterestButton;
