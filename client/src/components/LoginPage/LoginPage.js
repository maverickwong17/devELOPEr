import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import "./LoginPage.css";
const LoginPage = () => {
  return (
    // <> className="login_container">
    <Form className="login_form">
      {/* <span> */}
      <h2>Welcome Back</h2>
      <h4 className="side_text">Sign In to continue</h4>
      <input className="login_input" placeholder="Username" />
      <input type="password" className="login_input" placeholder="Password" />
      <span className="remember_me">
        {" "}
        <input className="checkbox" type="checkbox" /> Remember me
      </span>
      <Button className="signin_btn">SIGN IN</Button>
      <p>Did you forget your password?</p>
      <Button className="reset_btn">Reset here</Button>
      <a href="/signup" type="button" className="signup_btn">
        SIGN UP
      </a>
      {/* </span> */}
    </Form>
    // </Container>
  );
};

export default LoginPage;
