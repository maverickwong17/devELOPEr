import React from "react";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/react-splide/css";

import "./landing.css";
const LandingPage = () => {
  return (
    <div className="landingContainer">
      <Row className="align-items-center mx-auto ">
        <div className="tag">
          <h1>Where They Always Promise To Callback()</h1>
          <Link className=" btn matchBtn" to={"/signup"}>
            Find Your Match Today
          </Link>
        </div>
      </Row>
      <Row className="splide_section">
        <Splide
          aria-label="My Favorite Images"
          options={{
            type: "loop",
            gap: "5rem",
            drag: "free",
            arrows: false,
            pagination: false,
            perPage: 2,
            padding: "10%",
            margin: "50%",
            autoScroll: {
              pauseOnHover: false,
              pauseOnFocus: false,
              rewind: false,
              speed: 2,
            },
            breakpoints: {
              2000: {
                perPage: 3,
              },
              1800: {
                perPage: 0,
              },
              1550: {
                perPage: 2,
              },
              900: {
                perPage: 1,
              },
              1200: {
                perPage: 2,
              },
              400: {
                perPage: 0.1,
              },
            },
          }}
          extensions={{ AutoScroll }}
        >
          <SplideSlide>
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
              alt="Image 1"
              className="splideImg"
            />
          </SplideSlide>
          <SplideSlide>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFR2mVAx8bkghX04MOTSwnnfoUSD8BlCGNEA&usqp=CAU"
              alt="Image 2"
              className="splideImg"
            />
          </SplideSlide>
          <SplideSlide>
            <img
              src="https://media.vanityfair.com/photos/61fc0e53f5c5a2437d283af6/master/w_2560%2Cc_limit/1199282262"
              alt="Image 3"
              className="splideImg"
            />
          </SplideSlide>
          <SplideSlide>
            <img
             src="https://backend.artreview.com/wp-content/uploads/2021/11/Mark-Zuckerberg_Courtesy-Facebook.jpg"
              alt="Image 4"
              className="splideImg"
            />
          </SplideSlide>
          <SplideSlide>
            <img
              src="https://media1.popsugar-assets.com/files/thumbor/gLSZSLj5vDzOv6kno4SYK5I6fLc/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2022/06/03/892/n/46712211/627a8ceb4384d234_MSDTOGU_EC018/i/Tom-Cruise-as-Pete-Maverick-Mitchell-Then.jpg"
              alt="Image 5"
              className="splideImg"
            />
          </SplideSlide>
          <SplideSlide>
            <img
              src="https://media.istockphoto.com/photos/young-woman-photographing-the-autumn-season-picture-id864516870?b=1&k=20&m=864516870&s=170667a&w=0&h=Hg4HcoGEfJ5QUqNSLFfKiOrD5xncPDPMe4BpBP7HR44="
              alt="Image 6"
              className="splideImg"
            />
          </SplideSlide>
          <SplideSlide>
            <img
              src="https://pittnews.com/wp-content/uploads/2021/01/C_Cody-Ko_Via.jpg"
              alt="Image 7"
              className="splideImg"
            />
          </SplideSlide>
          <SplideSlide>
            <img
              src="https://i.insider.com/533c613becad04652e0a1aad?width=300&format=jpeg&auto=webp"
              alt="Image 8"
              className="splideImg"
            />
          </SplideSlide>
        </Splide>
      </Row>
    </div>
  );
};

export default LandingPage;
