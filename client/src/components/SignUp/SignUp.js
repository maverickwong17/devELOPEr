import React, { useState, useCallback } from "react";
import {
  Form,
  Container,
  Row,
  Col,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import InterestButton from "../InterestButton/InterestButton";
import cuid from "cuid";
import data from "../../data/interestsJson";

import "./SignUp.css";
const SignUp = () => {
  //TODO: add to  images attr in user Model
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
  // console.log(acceptedFiles);
  return (
    <div className="container_signup">
      <Row className="row_gap">
        <Col className="profile_details" md={3}>
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
            <h4>Interests</h4>
            <div className="grid justify">
              {data.map((interest) => {
                return (
                  <InterestButton
                    icon={interest.icon}
                    interest={interest.interest}
                  />
                );
              })}
            </div>
          </Row>{" "}
          <Row>
            <h4>What are you looking for?...</h4>
            <div className="grid">f</div>
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
          <Button className="signup">SIGN UP</Button>
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
