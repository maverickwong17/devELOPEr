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
  const [accountState, setAccountState] = useState({
    email: '',
    password: ''
  })
  const [formState, setFormState] = useState({
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

  const handleAccountChange = (event) => {
    var { name, value } = event.target;
		setAccountState({
		...accountState,
		[name]: value,
		});
    console.log(accountState)
  }

  const handleChange = (event) => {
    var { name, value } = event.target;
		setFormState({
		...formState,
		[name]: value,
		});
    console.log(formState)
	};

  const handleFormSubmit = async (event) => {
    console.log(event)
    event.preventDefault();
    console.log('submit')

    const submit = {
      ...accountState,
      input: {...formState}}

    console.log(submit);

    try {
      const { data } = await addUser({
        variables: { ...submit },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.log(data)
      console.error(e);
      console.log(JSON.stringify(e));
    }

    setFormState({
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
  };


  <Form.Select 
    style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    }}
    className="input"
    id="dropdown-button-dark-example1"
  >
  <option>Open this select menu</option>
  <option value="1">She/Hers</option>
  <option value="2">He/His</option>
  <option value="3">They/Them</option>
</Form.Select>

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
                  onChange={handleAccountChange}
                  />
                <input 
                  className="input" 
                  placeholder="Password" 
                  type="password"
                  name="password" 
                  value={formState.password}
				          onChange={handleAccountChange}
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
                <select 
                    style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    }}
                    className="input"
                    id="dropdown-button-dark-example1"
                    name ="gender"
                    onChange={handleChange}
                  >
                  <option>
                      Gender
                  </option>
                  <option                     
                    name="gender"
                    value='She/Hers'>
                      She/Hers
                  </option>
                  <option                     
                    name="gender"
                    value="He/His"> 
                      He/His
                  </option>
                  <option                     
                    name="gender"
                    value="They/Them">
                      They/Them
                  </option>
                </select>
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
