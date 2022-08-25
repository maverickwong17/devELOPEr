import React from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";

import "./SignUp.css";
const SignUp = () => {
  return (
    <div className="container_signup">
      <Row className="row_gap">
        <Col className="profile_details">
          <Row>
            Profile Details
            <div className="grid">
              <Form className="form">
                <input className="input" type="text" placeholder="First Name" />
                <input className="input" type="text" placeholder="Last Name" />
                <input className="input" type="date" />
                <input className="input" type="text" placeholder="Gender" />
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
            <div className="grid">sdcd</div>
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
