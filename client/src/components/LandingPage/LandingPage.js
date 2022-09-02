import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import HomePage from "../home/homepage";
import "@splidejs/react-splide/css";

// or other themes
// import '@splidejs/react-splide/css/skyblue';
// import '@splidejs/react-splide/css/sea-green';
import "./landing.css";
const LandingPage = () => {
  return (
    <Container className="">
      <div className="landingContainer">
        <Row className="align-items-center mx-auto ">
          <Col>
            <div className="tag">
              <h1>Where They Always Promise To Callback()</h1>
              <Link className=" btn matchBtn" to={"/signup"}>
                Find Your Match Today
              </Link>
            </div>
          </Col>
          <Col>
            <Splide
              aria-label="My Favorite Images"
              options={{
                type: "loop",
                gap: "10px",
                drag: "free",
                arrows: false,
                pagination: false,
                perPage: 3,
                autoScroll: {
                  pauseOnHover: false,
                  pauseOnFocus: false,
                  rewind: false,
                  speed: 0.5,
                },
              }}
              extensions={{ AutoScroll }}
            >
              <SplideSlide>
                <img
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="Image 1"
                  className="splideImg"
                />
              </SplideSlide>
              <SplideSlide>
                <img
                  src="https://randomuser.me/api/portraits/women/1.jpg"
                  alt="Image 2"
                  className="splideImg"
                />
              </SplideSlide>
              <SplideSlide>
                <img
                  src="https://randomuser.me/api/portraits/men/2.jpg"
                  alt="Image 3"
                  className="splideImg"
                />
              </SplideSlide>
              <SplideSlide>
                <img
                  src="https://randomuser.me/api/portraits/women/2.jpg"
                  alt="Image 4"
                  className="splideImg"
                />
              </SplideSlide>
              <SplideSlide>
                <img
                  src="https://randomuser.me/api/portraits/men/3.jpg"
                  alt="Image 5"
                  className="splideImg"
                />
              </SplideSlide>
              <SplideSlide>
                <img
                  src="https://randomuser.me/api/portraits/women/3.jpg"
                  alt="Image 6"
                  className="splideImg"
                />
              </SplideSlide>
              <SplideSlide>
                <img
                  src="https://randomuser.me/api/portraits/men/4.jpg"
                  alt="Image 7"
                  className="splideImg"
                />
              </SplideSlide>
              <SplideSlide>
                <img
                  src="https://randomuser.me/api/portraits/women/4.jpg"
                  alt="Image 8"
                  className="splideImg"
                />
              </SplideSlide>
              {/* <SplideSlide> ....map if wanted */}
            </Splide>
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col></Col>
        </Row>
      </div>
    </Container>
  );
};

export default LandingPage;
