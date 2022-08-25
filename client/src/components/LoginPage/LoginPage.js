import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import "./LoginPage.css";
const LoginPage = () => {
  return (
    <Container className="login_container">
      <Form className="login_form">
        {/* <span> */}
        <h2>Welcome Back</h2>
        <h4>Sign In to continue</h4>
        <input className="login_input" placeholder="username" />
        <input className="login_input" placeholder="password" />
        <span>
          {" "}
          <input type="checkbox" /> Remember me
        </span>
        <Button className="signin_btn">SIGN IN</Button>
        <p>Did you forget your password?</p>
        <Button>Reset here</Button>
        <Button>SIGN UP</Button>
        {/* </span> */}
      </Form>
    </Container>
  );
};

export default LoginPage;
