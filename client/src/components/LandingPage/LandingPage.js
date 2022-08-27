import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import './landing.css'
const LandingPage = () => {
  return (
    <Container className="">
    <div className="landingContainer">
      <Row className="align-items-center mx-auto ">
        <Col >
        <div className="tag">
          <h1>Where They Always Promise To Callback()</h1>
          <Link
            className=" btn matchBtn"
            to = {'/signup'}
          >
            Find Your Match Today
          </Link>
        </div>
        </Col>
        <Col>
          <img className="coverImg" src="https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e_400x400.jpg"></img>
        </Col>
      </Row>
    </div>
    </Container>
  );
};

export default LandingPage;
