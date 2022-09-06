import React, { useState, useCallback } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import InterestButton from "../InterestButton/InterestButton";
import interest from "../../data/interestsJson";
import MediaQuery from "react-responsive";
import Slider from "@mui/material/Slider";
import "./SignUp.css";

const SignUp = () => {
  const [files, setFiles] = useState([]);

  const [accountState, setAccountState] = useState({
    email: "",
    password: "",
  });
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    location: "",
    age: "",
    job: "",
    gender: "",
    github: "",
    linkedin: "",
    seeking: "",
    aboutme: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `codeinfuse, medium, gist`);
      formData.append("upload_preset", "jca5ahfc");
      formData.append("api_key", "913953185515193");
      formData.append("timestamp", (Date.now() / 1000) | 0);
      fetch("https://api.cloudinary.com/v1_1/dhuyyu7wp/image/upload", {
        method: "POST",
        headers: { "X-Requested-With": "XMLHttpRequest" },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => setFiles((prevState) => [...prevState, data.url]));
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


  const handleAccountChange = (event) => {
    var { name, value } = event.target;
    setAccountState({
      ...accountState,
      [name]: value,
    });
  };

  const handleChange = (event) => {
    var { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const [ageRange, setAgeRange] = useState([21, 65]);

  const handleAge = (Age) => {
    setAgeRange(Age);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    var interestArr = [];
    for (let i = 0; i < interestData.length; i++) {
      if (interestData[i].state) {
        interestArr.push(interestData[i].interest);
      }
    }

    const submit = {
      ...accountState,
      input: {
        ...formState,
        range: ageRange,
        images: files,
        interest: interestArr,
      },
    };

    try {
      const { data } = await addUser({
        variables: { ...submit },
      });

      Auth.login(data.addUser.token);
      window.location.href("/leetcode");
    } catch (e) {
      console.error(e);
    }

    setFormState({
      firstName: "",
      lastName: "",
      age: "",
      location: "",
      job: "",
      interest: "",
      github: "",
      linkedin: "",
      images: "",
      range: "",
    });
  };

  var interestData = interest;
  const handleInterestArr = async (event) => {
    const click = event.target.innerText;
    const index = interestData.findIndex(function (interestData) {
      if (interestData.interest) {
        return interestData.interest === click;
      }
    });
    interestData[index].state = !interestData[index].state;
  };

  return (
    <div className="container_signup">
      <Row className="row_gap">
        <Col className="profile_details mt-0 ml-10px">
          <Row>
            <h4>Account Information</h4>
            <div className="grid">
              <Form className="form">
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
                  type="text"
                  placeholder="City"
                  name="location"
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

                <select
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  className="input"
                  id="dropdown-button-dark-example1"
                  name="gender"
                  onChange={handleChange}
                >
                  <option>Gender</option>
                  <option name="gender" value="She/Her">
                    She/Her
                  </option>
                  <option name="gender" value="He/His">
                    He/His
                  </option>
                  <option name="gender" value="They/Them">
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
              {interestData.map((interest, index) => (
                <InterestButton
                  checkedState={index}
                  onClick={handleInterestArr}
                  value={interest.interest}
                  key={index}
                  interest={interest.interest}
                  disabled={interest.state}
                />
              ))}
            </div>
          </Row>
          <Row>
            <h4>What are you looking for?... </h4>
            <div className="grid">
              <Form className="form">
                <select
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  className="input"
                  id="dropdown-button-dark-example2"
                  name="seeking"
                  onChange={handleChange}
                >
                  <option>Looking For...</option>
                  <option name="seeking" value="She/Her">
                    She/Her
                  </option>
                  <option name="seeking" value="He/His">
                    He/His
                  </option>
                  <option name="seeking" value="They/Them">
                    They/Them
                  </option>
                </select>
              </Form>
              <h4>Between the Age of ...</h4>
              <Slider
                min={18}
                size="large"
                sx={{
                  color: "#a30e3b",
                }}
                getAriaLabel={() => "Age range"}
                value={ageRange}
                onChange={handleAge}
                valueLabelDisplay="auto"
              />
            </div>
          </Row>
          <MediaQuery maxWidth={900}>
            <Row>
              <h4>About Me</h4>
              <div className="grid expand">
                <Form className="form">
                  <textarea
                    className="input about"
                    type="text"
                    placeholder="About Me"
                    name="aboutme"
                    value={formState.aboutme}
                    onChange={handleChange}
                  />
                </Form>
              </div>
            </Row>
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
            <Button className="signup" onClick={handleFormSubmit}>
              SIGN UP
            </Button>
          </MediaQuery>
        </Col>
        <MediaQuery minWidth={900}>
          <Col md={4} className="grid_images">
            <Row>
              <h4>About Me</h4>
              <div className="grid expand">
                <Form className="form">
                  <textarea
                    className="input about"
                    type="text"
                    placeholder="About Me"
                    name="aboutme"
                    value={formState.aboutme}
                    onChange={handleChange}
                  />
                </Form>
              </div>
            </Row>
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
            <Button className="signup" onClick={handleFormSubmit}>
              SIGN UP
            </Button>
          </Col>
        </MediaQuery>
      </Row>
    </div>
  );
};

export default SignUp;
