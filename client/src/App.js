import "./App.css";
import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Header from "./components/Header/Header";
import Background from "./components/Background/Background";
import LandingPage from "./components/LandingPage/LandingPage";
import LoginPage from "./components/LoginPage/LoginPage";
import SignUp from "./components/SignUp/SignUp";
import Leetcode from "./components/Leetcode/Leetcode";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
// https://www.apollographql.com/docs/react/api/link/apollo-link-context/
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// console.log("httpLink", httpLink)
// console.log(authLink)
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client = {client}>
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
    </ApolloProvider>
  );
}

export default App;
