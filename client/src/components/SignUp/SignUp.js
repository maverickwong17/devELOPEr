import React from "react";
import {
  Form,
  Container,
  Row,
  Col,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import InterestButton from "../InterestButton/InterestButton";
import data from "../../data/interestsJson";

import "./SignUp.css";
const SignUp = () => {
  return (
    <div className="container_signup">
      <Row className="row_gap">
        <Col className="profile_details">
          <Row>
            <h4>Profile Details</h4>
            <div className="grid">
              <Form className="form">
                <input className="input" type="text" placeholder="First Name" />
                <input className="input" type="text" placeholder="Last Name" />
                <input className="input" type="text" placeholder="Zipcode" />
                {/* TODO: date not showing up */}
                <input className="input" type="date" />
                {/* <input className="input" type="text" placeholder="Gender" /> */}
                <Dropdown>
                  <Dropdown.Toggle
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    className="input"
                    id="dropdown-button-dark-example1"
                  >
                    Gender
                  </Dropdown.Toggle>

                  <Dropdown.Menu variant="dark" style={{ width: "100%" }}>
                    <Dropdown.Item href="#/action-1" active>
                      Female (she/hers)
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Male (he/his)
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">(they/them)</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <input
                  className="input"
                  id="telNo"
                  name="telNo"
                  type="tel"
                  placeholder="(123) 456-7890"
                />
                <input className="input" type="text" placeholder="Job Title" />
              </Form>
            </div>
          </Row>
          <Row>
            Interests
            <div className="grid">
              {data.map((interest) => {
                return (
                  <InterestButton
                    icon={interest.icon}
                    interest={interest.interest}
                  />
                );
              })}
            </div>
          </Row>
          <Row>
            What are you looking for...
            <div className="grid">sdcd</div>
          </Row>
          <Button className="signup">SIGN UP</Button>
        </Col>
        <Col
          md={8}
          //   sm={1}
        >
          <Row className="grid_images"></Row>{" "}
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;
//**
// { "icon": "", "interest": "golf" },
// { "icon": "", "interest": "running" },
// { "icon": "", "interest": "soccer" },
// { "icon": "", "interest": "dance" },
// { "icon": "", "interest": "swimming" },
// { "icon": "", "interest": "ice hockey" },
// { "icon": "", "interest": "tennis" },
// { "icon": "", "interest": "baseball" },
// { "icon": "", "interest": "karate" },
// { "icon": "", "interest": "fishing" },
// { "icon": "", "interest": "skiing" } * /
