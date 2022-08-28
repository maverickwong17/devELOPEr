import "./App.css";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Header from "./components/Header/Header";
import Background from "./components/Background/Background";
import LandingPage from "./components/LandingPage/LandingPage";
import LoginPage from "./components/LoginPage/LoginPage";
import SignUp from "./components/SignUp/SignUp";
import Leetcode from "./components/Leetcode/Leetcode";
import Sidebar from "./components/Sidebar/Sidebar";
import { Col, Row } from "react-bootstrap";

function App() {
  return (
    <>
      <Background>
        <Header />
        <Row>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signin" element={<LoginPage />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </BrowserRouter>
          <Col md={1}>
            <Sidebar />
          </Col>
          <Col md={11}>
            {" "}
            <BrowserRouter>
              <Routes>
                <Route path="/leetcode" element={<Leetcode />} />
              </Routes>
            </BrowserRouter>
          </Col>
        </Row>
      </Background>

      <Layout />
    </>
  );
}

export default App;
