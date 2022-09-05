import React, { useState, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import { AiFillHeart } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { FaUndo } from "react-icons/fa";
import InterestButton from "../../InterestButton/InterestButton";
import data from "../../../data/interestsJson";
import "../swipe.css";
import { useMutation } from "@apollo/client";
import { ADD_CONNECTION } from "../../../utils/mutations";
import { QUERY_ME } from "../../../utils/queries";
import auth from "../../../utils/auth";
import { useQuery } from "@apollo/client";

const SwipeCard = ({ profiles, currentUser }) => {

  const { loading: load, data: me } = useQuery(QUERY_ME);
  var myId = me.me._id
  const users = profiles.filter(profiles => profiles._id !== myId);
  const [addConnection, { error, userData }] = useMutation(ADD_CONNECTION);
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

  const swiped = async (direction, user, index) => {
    console.log("USER ID", user._id);
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
    if (direction === "left") {
      return;
    }
    if (direction === "right") {
      try {
        await addConnection({
          variables: { id: user._id },
        });
        console.log("right");
      } catch (error) {
        console.log(JSON.stringify(error));
      }
    }
  };

  const outOfFrame = (name, idx) => {
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir, user) => {
    // console.log("USER IN SWIPE", user);
    // console.log(childRefs[currentIndex].current);
    if (canSwipe && currentIndex < users.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
      //   console.log(dir);
      //   if (auth.loggedIn) {
      //     // if (dir === "left") {
      //     //   console.log(dir);
      //     //   return;
      //     // }
      //     if (dir === "right") {
      //       // makeConnection({
      //       //   variables:
      //       // })
      //       console.log(dir);
      //     }
      //   }
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
          <>
            <TinderCard
              ref={childRefs[index]}
              className="swipe"
              key={user.profile.firstName}
              onSwipe={(dir) => swiped(dir, user, index)}
              onCardLeftScreen={() => outOfFrame(user.profile.firstName, index)}
              preventSwipe={["up", "down"]}
            >
              <div className="card">
                <img
                  src={user.profile.images[0]}
                  alt={user.profile.firstName}
                  className="userImage"
                ></img>

                <span
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <h3>
                    {user.profile.firstName} {user.profile.lastName},{" "}
                    {user.profile.age}
                  </h3>
                  <h5>{user.profile.location}</h5>
                </span>
                <hr />
                <div className="interest_section">
                  {" "}
                  <h4 style={{ color: "black" }}>Interests:</h4>
                  {user.profile.interest.map((interest, index) => {
                    return (
                      <InterestButton
                        disabled="true"
                        icon = {interest.icon}
                        interest={interest.interest}
                        key={index}
                      />
                    );
                  })}
                </div>

                <hr />
                <span style={{ fontSize: "20px" }}>{user.profile.aboutme}</span>
              </div>
            </TinderCard>
          </>
        ))}
      </div>
      <div className="buttons">
        <button className="button" onClick={() => swipe("left")}>
          <MdCancel size={45} />
        </button>
        <button className="button" onClick={() => swipe("right")}>
          <AiFillHeart size={45} />
        </button>
      </div>

      {lastDirection ? (
        <h2 key={lastDirection} className="infoText">
          You swiped {lastDirection}
        </h2>
      ) : (
        ""
      )}
    </>
  );
};

export default SwipeCard;
