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
                  src="https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg"
                  alt="Image 1"
                />
              </SplideSlide>
              <SplideSlide>
                <img
                  src="https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg"
                  alt="Image 1"
                />
              </SplideSlide>
              <SplideSlide>
                <img
                  src="https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg"
                  alt="Image 1"
                />
              </SplideSlide>
              <SplideSlide>
                <img
                  src="https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg"
                  alt="Image 1"
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
