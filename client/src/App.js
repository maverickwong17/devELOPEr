import "./App.css";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Header from "./components/Header/Header";
import Background from "./components/Background/Background";
import LandingPage from "./components/LandingPage/LandingPage";
import LoginPage from "./components/LoginPage/LoginPage";
import SignUp from "./components/SignUp/SignUp";
import Leetcode from "./components/Leetcode/Leetcode";

function App() {
  return (
    <>
      <Background>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/leetcode" element={<Leetcode />} />
          </Routes>
        </BrowserRouter>
      </Background>

      <Layout />
    </>
  );
}

export default App;
