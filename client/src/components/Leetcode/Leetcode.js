import React, { useState, useCallback } from "react";
import { Col, Row, Badge, Button, Container, Dropdown } from "react-bootstrap";
import { FiCode } from "react-icons/fi";
import { FaCog, FaExclamationCircle, FaUserAlt } from "react-icons/fa";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import "./Leetcode.css";
const Leetcode = () => {
  const [input, setInput] = useState(localStorage.getItem("input") || "");
  const [output, setOutput] = useState("");
  const [language_id, setLanguageId] = useState(
    localStorage.getItem("language_id") || 2
  );
  const [user_input, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const userInputHandler = (e) => {
    e.preventDefault();
    setUserInput(e.target.value);
  };
  const textInputHandler = (e) => {
    e.preventDefault();
    setInput(e.target.value);
    localStorage.setItem("input", e.target.value);
  };
  const runCodeHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "f1e041c99cmsh2db2a8071e986aep1f423ejsnc1c24dc52c1d",
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
            "x-rapidapi-key":
              "f1e041c99cmsh2db2a8071e986aep1f423ejsnc1c24dc52c1d",
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

  return (
    <Row className="grid">
      <Row>
        <Col>
          {" "}
          <h3 style={{ color: "white" }}>Coding Challenge</h3>
          <p style={{ color: "white" }}>
            You are given an integer n. We reorder the digits in any order
            (including the original order) such that the leading digit is not
            zero. Return true if and only if we can do this so that the
            resulting number is a power of two.
          </p>
          <hr style={{ fill: "white" }} />
        </Col>
        <Col>
          {" "}
          <div
            style={{
              display: "flex",

              justifyContent: "space-between",
              alignItems: "bottom",
              float: "bottom",
            }}
          >
            <Badge
              bg=""
              className=" heading my-2 "
              style={{ color: "#a30e3b", background: "transparent" }}
            >
              <FaExclamationCircle /> Output
            </Badge>
            {/* <div> */}
            {/* <Dropdown>
              <Dropdown.Toggle
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                className="input"
                value={language_id}
                onChange={(e) => {
                  setLanguageId(e.target.value);
                  console.log(e.target.value);
                }}
                id="tags"
                // className="form-control form-inline mb-2 language"
                // id="dropdown-button-dark-example1"
              >
                Choose Language
              </Dropdown.Toggle>

              <Dropdown.Menu variant="dark" style={{ width: "100%" }}>
                <Dropdown.Item value="63">JavaScript</Dropdown.Item>
                <Dropdown.Item value="54">C++</Dropdown.Item>
                <Dropdown.Item value="71">Python</Dropdown.Item>
                <Dropdown.Item value="62">Java</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
            <select
              value={language_id}
              onChange={(e) => {
                setLanguageId(e.target.value);
                console.log(e.target.value);
              }}
              id="tags"
              className="form-control form-inline mb-2 language input"
            >
              <option value="54">C++ </option>
              <option value="62">Java</option>
              <option value="71">Python</option>
              <option value="63">JavaScript</option>
            </select>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          {" "}
          <CodeMirror
            required
            name="solution"
            id="source"
            value={
              language_id === "63"
                ? "console.log(`hello`);"
                : language_id === "54"
                ? `#include <iostream>

                int main() {
                    std::cout << "hello, world" << std::endl;
                    return 0;
                }
                `
                : language_id === "71"
                ? `print("hello")`
                : `public class Main {
                  public static void main(String[] args) {
                      System.out.println("hello, world");
                  }
              }
              `
            }
            height="450px"
            theme="dark"
            extensions={
              language_id === 63
                ? javascript({ jsx: true })
                : language_id === 54
                ? cpp()
                : java()
            }
            onChange={onChange}
          />
          <div
            style={{
              display: "flex",
              alignItems: "right",
              justifyContent: "right",
            }}
          >
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
          </div>
        </Col>
        <Col>
          {" "}
          <CodeMirror
            height="450px"
            theme="dark"
            id="output"
            value={loading ? "running submission..." : output ? output : ""}
            readOnly="nocursor"
          ></CodeMirror>
        </Col>
      </Row>
    </Row>
  );
};

export default Leetcode;
