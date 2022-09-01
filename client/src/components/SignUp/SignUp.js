import React, { useState, useCallback } from "react";
import {
  Form,
  // Container,
  Row,
  Col,
  Button,
  // Dropdown,
  // DropdownButton,
} from "react-bootstrap";
import { useDropzone } from "react-dropzone";

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

import InterestButton from "../InterestButton/InterestButton";
import interest from "../../data/interestsJson";
// import cuid from "cuid";
// import data from "../../data/interestsJson";
import Slider from '@mui/material/Slider';

import "./SignUp.css";

const SignUp = () => {
  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `codeinfuse, medium, gist`);
      formData.append("upload_preset", "jca5ahfc"); // Replace the preset name with your own
      formData.append("api_key", "913953185515193"); // Replace API key with your own Cloudinary key
      formData.append("timestamp", (Date.now() / 1000) | 0);
      fetch("https://api.cloudinary.com/v1_1/dhuyyu7wp/image/upload", {
        method: "POST",
        headers: { "X-Requested-With": "XMLHttpRequest" },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => setFiles((prevState) => [...prevState, data.url]));
      // const reader = new FileReader();

      // reader.onload = function (e) {
      //   setFiles((prevState) => [
      //     ...prevState,
      //     { id: cuid(), src: e.target.result },
      //   ]);
      // };
      // reader.readAsDataURL(file);
      // return file;
      // reader.setFiles(acceptedFiles);
    });
  }, []);
  console.log(files);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
    range: '',
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

    const submit ={
                  ...accountState,
                  input: {
                        ...formState, 
                        images: files
                        }
                  }

    console.log(submit);

    try {
      const { data } = await addUser({
        variables: { ...submit },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
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

  const [value, setValue] = React.useState([18, 100]);

  const handleValue = (event, newValue) => {
    setValue(newValue);
  };

  function valuetext(value) {
    return `${value}°C`;
  }

  return (
    <div className="container_signup">
      <Row className="row_gap">
        <Col className="profile_details mt-0">
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
            <h4>Interests</h4>
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
            <h4>What are you looking for?...  </h4>
            <div className="grid">
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
              <Slider
                  getAriaLabel={() => 'Age range'}
                  value={value}
                  onChange={handleValue}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                />
            </div>
          </Row>
        </Col>
        <Col md={4} className="grid_images">
          <Row>
            <h4>Upload Images</h4>
            <div className="grid expand">
              <div className="images">
                {files.map((file) => (
                  <img className="image" src={file} key={file} />
                ))}
              </div>
              <section className="section">
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Drop the files here...</p>
                  ) : (
                    <p>Drag n drop files here...</p>
                  )}
                </div>
              </section>
            </div>
          </Row>{" "}
          <Button className="signup" onClick={handleFormSubmit}>SIGN UP</Button>
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
