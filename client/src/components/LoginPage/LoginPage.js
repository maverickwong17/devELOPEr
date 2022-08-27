import React, { useState } from 'react';
import { Container, Form, Button } from "react-bootstrap";
import "./LoginPage.css";

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

const Login = (props) => {
	const [formState, setFormState] = useState({ email: '', password: '' });
	const [login, { error, data }] = useMutation(LOGIN_USER);

	// update state based on form input changes
	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormState({
		...formState,
		[name]: value,
		});
	};

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };
}


const LoginPage = (props) => {
	// const [login, { error, data }] = useMutation(LOGIN_USER);
	const [formState, setFormState] = useState({ username: '', password: '' });
	const [login, { error, data }] = useMutation(LOGIN_USER);

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormState({
		...formState,
		[name]: value,
		});
		console.log(formState)
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		console.log(formState);
		try {
		  const { data } = await login({
			variables: { ...formState },
		  });
	
		  Auth.login(data.login.token);
		} catch (e) {
		  console.error(e);
		}
	}
	
  	return (
	// <> className="login_container">
	<Form className="login_form">
	{/* <span> */}
		<h2>Welcome Back</h2>
		<h4 className="side_text">Sign In to continue</h4>
		<form onSubmit={handleFormSubmit}>
			<input 
				className="login_input" 
				placeholder="Username"
				value={formState.username}
				onChange={handleChange}
				/>
			<input 
				type="password" 
				className="login_input" 
				placeholder="Password" 
				value={formState.password}
				onChange={handleChange}
				/>
		</form>
		<span className="remember_me">
			{" "}
			<input className="checkbox" type="checkbox" /> Remember me
		</span>
		<Button className="signin_btn" type='submit'>SIGN IN</Button>
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
