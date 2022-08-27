import React, { useState } from "react";
import { Col, Row, Badge, Button } from "react-bootstrap";
import { FiCode } from "react-icons/fi";
import { FaCog, FaExclamationCircle, FaUserAlt } from "react-icons/fa";
import "./Leetcode.css";
const Leetcode = () => {
  const [input, setInput] = useState(localStorage.getItem("input") || "");
  const [output, setOutput] = useState("");
  const [language_id, setLanguageId] = useState(
    localStorage.getItem("language_id") || 2
  );
  const [user_input, setUserInput] = useState("");
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
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "f1e041c99cmsh2db2a8071e986aep1f423ejsnc1c24dc52c1d",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      body: JSON.stringify({
        language_id: 63,
        source_code: encode('console.log("hello, world");'),
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
      }
    }
    if (jsonGetSolution.stdout) {
      const output = atob(jsonGetSolution.stdout);
      console.log(output);
    } else if (jsonGetSolution.stderr) {
      const error = atob(jsonGetSolution.stderr);
    } else {
      const comp_error = atob(jsonGetSolution.compile_output);
    }
  };
  return (
    <>
      <div>
        <Button type="submit" className="btn-danger" onClick={runCodeHandler}>
          <FaCog /> Run
        </Button>
      </div>
    </>
  );
};

export default Leetcode;
