import React, { useState } from "react";
import {
  Form,
  Container,
  Row,
  Col,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";

// import { useMutation } from '@apollo/client';
// import { ADD_USER } from '../../utils/mutations';
// import Auth from '../../utils/auth';

import InterestButton from "../InterestButton/InterestButton";
import interest from "../../data/interestsJson";

import "./SignUp.css";
const SignUp = () => {
  // const [formState, setFormState] = useState({
  //   username: '',
  //   email: '',
  //   password: '',
  // });
  // const [addUser, { error, data }] = useMutation(ADD_USER);

  // const handleChange = (event) => {
	// 	const { name, value } = event.target;

	// 	setFormState({
	// 	...formState,
	// 	[name]: value,
	// 	});
	// };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log('submit')
    // console.log(formState);

    // try {
    //   const { data } = await addUser({
    //     variables: { ...formState },
    //   });

    //   Auth.login(data.addUser.token);
    // } catch (e) {
    //   console.error(e);
    // }
  };
  return (
    <div className="container_signup">
      <Row className="row_gap">
        <Col className="profile_details">
          <Row>
            <h4>Account Information</h4>
            <div className="grid">
              <Form className='form'>
                <input 
                  className="input" 
                  placeholder="Your Email Here" 
                  type="email"
                  name="email" 
                  />
                <input 
                  className="input" 
                  placeholder="Password" 
                  type="password"
                  name="password" 
                  />
              </Form>
            </div>
          </Row>
          <Row>
            <h4>Profile Details</h4>
            <div className="grid">
              <Form className="form">
                <input 
                  className="input" 
                  type="text" 
                  placeholder="First Name" 
                  name="first"
                />
                <input 
                  className="input" 
                  type="text" 
                  placeholder="Last Name" 
                  name="last"
                />
                <input 
                  className="input" 
                  type="number" 
                  placeholder="Zipcode" 
                  name="zipcode"
                  min='10000'
                />
                <input 
                  className="input" 
                  type="number"
                  placeholder="Age" 
                  min="18"
                />
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
                    name="gender"
                  >
                    Gender
                  </Dropdown.Toggle>

                  <Dropdown.Menu variant="dark" style={{ width: "100%" }}>
                    <Dropdown.Item href="#/action-1" active>
                      She/Hers
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      He/His
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      They/Them 
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <input
                  type="tel"
                  className="input"
                  id="telNo"
                  name="telNo"
                  placeholder="(123) 456-7890"
                />
                <input 
                  className="input" 
                  type="text" 
                  placeholder="Job Title" 
                  name="job"
                  />
                <input 
                  className="input" 
                  type="url" 
                  placeholder="GitHub" 
                  name="job"
                  />
                <input 
                  className="input" 
                  type="url" 
                  placeholder="LinkedIn" 
                  name="job"
                  />
              </Form>
            </div>
          </Row>
          <Row>
            Interests
            <div className="grid justify">
              {interest.map((interest) => {
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
            <div className="grid">placeholder text</div>
          </Row>
          <Button className="signup" onClick={handleFormSubmit}>SIGN UP</Button>
        </Col>
        <Col
          md={8}
          //   sm={1}
        >
          <Row className="grid_images">
          </Row>{" "}
          {/* <input 
                  className="input" 
                  type="file" 
                  placeholder="image" 
                  name="image"
                  alt="image"
                  /> */}
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
