import React, { useState, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import "./swipe.css";
import { AiFillHeart } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { FaUndo } from "react-icons/fa";
import InterestButton from "../InterestButton/InterestButton";
import data from "../../data/interestsJson";

import { Row } from "react-bootstrap";
import { QUERY_ALL_USER, QUERY_ME } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";

const db = [
  {
    name: "Richard Hendricks",
    url: "https://media.istockphoto.com/vectors/person-gray-photo-placeholder-man-vector-id1133765772?k=20&m=1133765772&s=612x612&w=0&h=2X073i6UQf9Z6NRxena3em12vhr7I7nromkZk4mfEmk=",
  },
  {
    name: "Erlich Bachman",
    url: "https://media.istockphoto.com/vectors/person-gray-photo-placeholder-man-vector-id1133765772?k=20&m=1133765772&s=612x612&w=0&h=2X073i6UQf9Z6NRxena3em12vhr7I7nromkZk4mfEmk=",
  },
  {
    name: "Monica Hall",
    url: "",
  },
  {
    name: "Jared Dunn",
    url: "",
  },
  {
    name: "Dinesh Chugtai",
    url: "https://media.istockphoto.com/vectors/person-gray-photo-placeholder-man-vector-id1133765772?k=20&m=1133765772&s=612x612&w=0&h=2X073i6UQf9Z6NRxena3em12vhr7I7nromkZk4mfEmk=",
  },
];

function Swiper() {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();

  const currentIndexRef = useRef(currentIndex);
  const { loading, userData } = useQuery(QUERY_ALL_USER);
  const users = userData || [];
  console.log(users);
  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;

  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <Row className="grid_swipe">
      <h1>React Tinder Card</h1>
      <div className="cards_section">
        <div className="cardContainer">
          {db.map((user, index) => (
            <TinderCard
              ref={childRefs[index]}
              className="swipe"
              key={user.name}
              onSwipe={(dir) => swiped(dir, user.name, index)}
              onCardLeftScreen={() => outOfFrame(user.name, index)}
            >
              <div className="card">
                <img src={user.url} alt={user.name} className="userImage"></img>
                <h3>
                  {user.name}, {user.age}
                </h3>
                <hr />
                <div className="interest_section">
                  {" "}
                  {data.slice(0, 4).map((interest) => {
                    return (
                      <InterestButton
                        disabled="true"
                        icon={interest.icon}
                        interest={interest.interest}
                      />
                    );
                  })}
                </div>
                <hr />
              </div>
            </TinderCard>
          ))}
        </div>
        <div className="buttons">
          <button onClick={() => swipe("left")}>
            <MdCancel size={60} />
          </button>
          <button onClick={() => goBack()}>
            <FaUndo size={40} />
          </button>
          <button onClick={() => swipe("right")}>
            <AiFillHeart size={50} />
          </button>
        </div>
        {lastDirection ? (
          <h2 key={lastDirection} className="infoText">
            You swiped {lastDirection}
          </h2>
        ) : (
          <h2 className="infoText">
            Swipe a card or press a button to get Restore Card button visible!
          </h2>
        )}
      </div>
    </Row>
  );
}

export default Swiper;
