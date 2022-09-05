import React, { useState, useCallback, useEffect } from "react";

import {
  Col,
  Row,
  Badge,
  Button,
  Container,
  Dropdown,
  Tabs,
  Tab,
  Alert,
} from "react-bootstrap";
import { FiCode } from "react-icons/fi";
import { FaCog, FaExclamationCircle, FaUserAlt } from "react-icons/fa";
import { AiOutlineArrowRight, AiOutlineInfoCircle } from "react-icons/ai";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import "./Leetcode.css";
import algorithms from "../../data/algorithmsJson";
import Sidebar from "../Sidebar/Sidebar";
import MediaQuery from "react-responsive";
const Leetcode = () => {
  const [key, setKey] = useState("input");
  const [algoOfTheDay, setAlgoOfTheDay] = useState({});
  const [output, setOutput] = useState("");
  const [language_id, setLanguageId] = useState("63");
  const [user_input, setUserInput] = useState(`console.log("hello");`);
  const [loading, setLoading] = useState(false);
  console.log(language_id, user_input);
  const runCodeHandler = async (e) => {
    setLoading(true);
    setKey("output");
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      body: JSON.stringify({
        language_id: language_id,
        source_code: encode(user_input),
        stdin: encode(""),
      }),
    };
    function encode(str) {
      console.log(btoa(unescape(encodeURIComponent(str || ""))));
      return btoa(unescape(encodeURIComponent(str || "")));
    }
    const response = await fetch(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*",
      options
    );
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    let jsonGetSolution = {
      status: { description: "Queue" },
      stderr: null,
      compile_output: null,
    };
    while (
      jsonGetSolution.status.description !== "Accepted" &&
      jsonGetSolution.stderr == null &&
      jsonGetSolution.compile_output == null
    ) {
      if (jsonResponse.token) {
        let url = `https://judge0-ce.p.rapidapi.com/submissions/${jsonResponse.token}?base64_encoded=true&fields=*`;
        const getSolution = await fetch(url, {
          method: "GET",
          headers: {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
            "content-type": "application/json",
          },
        });
        jsonGetSolution = await getSolution.json();
        setLoading(false);
      }
    }
    if (jsonGetSolution.stdout) {
      const output = atob(jsonGetSolution.stdout);
      console.log("output", output);
      setOutput(output);
    } else if (jsonGetSolution.stderr) {
      const error = atob(jsonGetSolution.stderr);
      console.log(error);
      setOutput(error);
    } else {
      const comp_error = atob(jsonGetSolution.compile_output);
      console.log(comp_error);
      setOutput(comp_error);
    }
  };
  const onChange = useCallback((value, viewUpdate) => {
    console.log("value:", value);
    setUserInput(value);
  }, []);
  const getRandomQuestion = () => {
    const algorithmOfTheDay =
      algorithms[Math.floor(Math.random() * algorithms.length)];
    setAlgoOfTheDay(algorithmOfTheDay);
  };
  useEffect(() => {
    getRandomQuestion();
  }, []);
  return (
    <>
      <div
        style={{
          width: "100%",
          textAlign: "center",
          color: "#999999",
          margin: "1rem 0 ",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span>
          {" "}
          <AiOutlineInfoCircle size={30} />{" "}
        </span>
        <span>Toggle the Dropdown to change the programming language.</span>
        <span>
          Hit 'Run' when you are ready to run your code and 'Submit' to move on
          to matching!
        </span>
      </div>
      <Row className="grid_l">
        <div style={{ height: "10%" }}>
          <Row>
            {" "}
            <span
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3 style={{ color: "white" }}>
                Coding Challenge {/* <span style={{ width: "fit-content" }}> */}
                {/* </span> */}
              </h3>
              <Alert
                style={{ width: "fit-content" }}
                variant={
                  algoOfTheDay.level === "easy"
                    ? "success"
                    : algoOfTheDay.level === "medium"
                    ? "warning"
                    : "danger"
                }
              >
                {algoOfTheDay.level}
              </Alert>
            </span>
            <p style={{ color: "white" }}>{algoOfTheDay.question}</p>
            {/* <hr style={{ fill: "white" }} /> */}
          </Row>
          <Row style={{ height: "fit-content" }}>
            {" "}
            <div
              style={{
                display: "flex",
                // background: "red",
                justifyContent: "right",
                alignItems: "center",
                float: "right",
                // background: "blue",
              }}
            >
              <select
                value={language_id}
                onChange={(e) => {
                  setLanguageId(e.target.value);
                  console.log(e.target.value);
                }}
                id="tags"
                className="form-control form-inline mb-2 language input"
              >
                <option value="63">JavaScript</option>
                <option value="54">C++ </option>
                <option value="62">Java</option>
                <option value="71">Python</option>
              </select>
            </div>
          </Row>
        </div>
        {/* <div className="line"></div> */}
        <Row className="code_grid">
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
            activeKey={key}
            onSelect={(k) => setKey(k)}
          >
            <Tab eventKey="input" title="Input" className="border-bottom-0">
              <CodeMirror
                required
                name="solution"
                id="source"
                value={
                  language_id === "63"
                    ? "console.log(`hello`);"
                    : language_id === "54"
                    ? `#include <iostream>\nint main(){\nstd::cout << "hello, world" << std::endl;\nreturn 0;\n}
                `
                    : language_id === "71"
                    ? `print("hello")`
                    : `public class Main {\npublic static void main(String[] args) {\nSystem.out.println("hello, world");\n}\n}
              `
                }
                height="450px"
                theme="dark"
                extensions={
                  language_id === "63"
                    ? javascript({ jsx: true })
                    : language_id === "54"
                    ? cpp()
                    : java()
                }
                onChange={onChange}
              />
            </Tab>
            <Tab eventKey="output" title="Output">
              <CodeMirror
                height="450px"
                theme="dark"
                id="output"
                value={loading ? "running submission..." : output ? output : ""}
                readOnly="nocursor"
              ></CodeMirror>
              {/* <Sonnet /> */}
            </Tab>
          </Tabs>
          <div className="buttons">
            <Button
              type="submit"
              className="run_btn"
              style={{
                marginTop: "10px",
              }}
              onClick={runCodeHandler}
            >
              <FaCog /> Run
            </Button>
            <Button
              type="submit"
              className="run_btn"
              style={{
                marginTop: "10px",
              }}
              onClick={() => window.location.replace("/swipe")}
            >
              {/* TODO: check to see if run btn has been run */}
              Submit <AiOutlineArrowRight />
            </Button>
          </div>
        </Row>
      </Row>
    </>
  );
};

export default Leetcode;
