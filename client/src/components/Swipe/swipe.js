import React, { useState, useMemo, useRef } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Row } from "react-bootstrap";
import { QUERY_ALL_USER, QUERY_ME } from "../../utils/queries";
import SwipeCard from "./swipeCard/swipeCard";
import { useQuery } from "@apollo/client";
import Loader from "../Loader/Loader";
import "./swipe.css";

function Swiper() {
  const { loading, data } = useQuery(QUERY_ALL_USER);
  const { loading: loadme, data: profile } = useQuery(QUERY_ME);
  const myprofile = profile?.me || {};
  if (loading || loadme) {
    return <Loader />;
  }
  if (!myprofile) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <>
   
      <Row className="grid_swipe">
        {/* <div className="cards_section"> */}
        <SwipeCard profiles={data.users} />
        {/* </div> */}
      </Row>

      <div
        style={{
          textAlign: "center",
          color: "#999999",
          margin: "1rem 0 ",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span>
          {" "}
          <AiOutlineInfoCircle size={30} />{" "}
        </span>
        <span>Swipe Left (✘) or Right(✓)</span>
        <span>
          or use the buttons to potentially match with a fellow developer!
        </span>
      </div>

    </>
  );
}
export default Swiper;
