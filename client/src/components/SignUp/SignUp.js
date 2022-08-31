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

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

import InterestButton from "../InterestButton/InterestButton";
import interest from "../../data/interestsJson";

import "./SignUp.css";

const SignUp = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    age: '',
    location: '',
    job: '',
    gender: '',
    interest: '',
    github: '',
    linkedin: '',
    images: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    var { name, value } = event.target;

		setFormState({
		...formState,
		[name]: value,
		// [name]: name==="gender"?  event.target.innerHTML : value,
		});
    console.log(formState)
	};

  const handleFormSubmit = async (event) => {
    console.log(event)
    event.preventDefault();
    console.log('submit')
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.log(data)
      console.error(e);
      console.log(JSON.stringify(e));
    }
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
                  placeholder="Email" 
                  name="email" 
                  value={formState.email}
                  onChange={handleChange}
                  />
                <input 
                  className="input" 
                  placeholder="Password" 
                  type="password"
                  name="password" 
                  value={formState.password}
				          onChange={handleChange}
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
                  placeholder="First Name" 
                  name="firstName"
                  value={formState.firstName}
                  onChange={handleChange}
                />
                <input 
                  className="input" 
                  type="text" 
                  placeholder="Last Name" 
                  name="lastName"
                  value={formState.lastName}
                  onChange={handleChange}
                />
                <input 
                  className="input" 
                  type="number" 
                  placeholder="Zipcode" 
                  name="location"
                  min='10000'
                  value={formState.location}
                  onChange={handleChange}
                />
                <input 
                  className="input" 
                  type="number"
                  placeholder="Age"
                  min="18"     
                  name="age"  
                  value={formState.age}
                  onChange={handleChange}
                />
                {/* <input className="input" type="text" placeholder="Gender" /> */}
                <Dropdown
                  >
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

                  <Dropdown.Menu variant="dark" style={{ width: "100%" }}

                  >
                    <Dropdown.Item active
                      eventKey="She/Hers"
                      name="gender"
                      onClick={handleChange}
                      value={formState.gender}
                    >
                      She/Hers
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="He/His"
                      name="gender"
                      onClick={handleChange}
                      value={formState.gender}
                    >
                      He/His
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="They/Them "
                      name="gender"
                      onClick={handleChange}
                      value={formState.gender}
                    >
                      They/Them 
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <input
                  type="tel"
                  className="input"
                  id="telNo"
                  name="telNo"
                  placeholder="(123)456-7890"
                  pattern="([0-9]{3})[0-9]{3}-[0-9]{4}"
                  maxLength='13'
                  value={formState.telNo}
				          onChange={handleChange}
                />
                <input 
                  className="input" 
                  type="text" 
                  placeholder="Job Title" 
                  name="job"
                  value={formState.job}
				          onChange={handleChange}
                  />
                <input 
                  className="input" 
                  type="text" 
                  placeholder="GitHub Username" 
                  name="github"
                  value={formState.github}
				          onChange={handleChange}
                  required
                  />
                <input 
                  className="input" 
                  type="text" 
                  placeholder="LinkedIn Profile" 
                  name="linkedin"
                  value={formState.linkedin}
				          onChange={handleChange}
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
