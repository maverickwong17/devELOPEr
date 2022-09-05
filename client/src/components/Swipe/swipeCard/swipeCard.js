import React, { useState, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import { AiFillHeart } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { FaUndo } from "react-icons/fa";
import InterestButton from "../../InterestButton/InterestButton";
import data from "../../../data/interestsJson";
import { Row, Col } from "react-bootstrap";
import "../swipe.css";

const SwipeCard = (profiles) => {
  const users = profiles.profiles;

  console.log(users);
  const [currentIndex, setCurrentIndex] = useState(users.length - 1);
  const [lastDirection, setLastDirection] = useState();

  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(users.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < users.length - 1;

  const canSwipe = currentIndex >= 0;

  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
    console.log(dir);
    if (canSwipe && currentIndex < users.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
      console.log(dir);
      if (dir === "left") {
        console.log(dir);
      }
    }
  };

  // increase current index and show card
  const goBack = async () => {
    console.log("back button");
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };
  return (
    <>
      <div className="cardContainer">
        {users.map((user, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={user.profile.firstName}
            onSwipe={(dir) => swiped(dir, user.profile.firstName, index)}
            onCardLeftScreen={() => outOfFrame(user.profile.firstName, index)}
            preventSwipe={["up", "down"]}
          >
            <div className="card ">
              <img
                src={user.profile.images[0]}
                alt={user.profile.firstName}
                className="userImage"
              ></img>
              <h3>
                {user.profile.firstName}, {user.profile.age}
              </h3>
              <hr />
              <div className="interest_section">
                {" "}
                {data.slice(0, 4).map((interest, index) => {
                  return (
                    <InterestButton
                      disabled="true"
                      icon={interest.icon}
                      interest={interest.interest}
                      key={index}
                    />
                  );
                })}
              </div>
              <hr />
            </div>
          </TinderCard>
        ))}
      </div>
      {/* <Row> */}
      <div className="buttons">
        <button className="button" onClick={() => swipe("left")}>
          <MdCancel size={60} />
        </button>
        <button className="button" onClick={() => goBack()}>
          <FaUndo size={45} />
        </button>
        <button className="button" onClick={() => swipe("right")}>
          <AiFillHeart size={60} />
        </button>
      </div>
      {/* </Row> */}
      {/* <Row> */}
      {lastDirection ? (
        <h2 key={lastDirection} className="infoText">
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className="infoText">
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )}
      {/* </Row> */}
    </>
  );
};

export default SwipeCard;
