import React from "react";
import InterestItem from "./InterestItem";
import "./InterestList.css";
const InterestList = ({ interests }) => {
  console.log("interests:", interests);

  const renderedList = interests.map((interest, i) => {
    return <InterestItem key={i} interest={interest} />;
  });

  return (
    <div className="ui relaxed divided list interestList">{renderedList}</div>
  );
};

export default InterestList;
