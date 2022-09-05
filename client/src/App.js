import "./App.css";
import React from "react";
import Auth from "./utils/auth";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Header from "./components/Header/Header";
import Background from "./components/Background/Background";
import LandingPage from "./components/LandingPage/LandingPage";
import LoginPage from "./components/LoginPage/LoginPage";
import SignUp from "./components/SignUp/SignUp";
import Leetcode from "./components/Leetcode/Leetcode";
import Sidebar from "./components/Sidebar/Sidebar";
import Swipe from "./components/Swipe/swipe";
import Profile from "./components/Profile/Profile";
import Loader from "./components/Loader/Loader";
import DevChatWrap from "./components/Chat/DevChatWrap";
import { Col, Row } from "react-bootstrap";
import MediaQuery from "react-responsive";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import MatchesPage from "./components/Matches/MatchesPage";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// import { isRequiredArgument } from "graphql";
// const isSmall = useMediaQuery({ query: "(max-width: 1275px)" });
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const currentChannel = "devELOPEr one";
const theme = "dark";

const renderPages = () => {};
function App() {
  return (
    <ApolloProvider client={client}>
      <Background>
        <Header />
        {Auth.loggedIn() && (
          <MediaQuery maxWidth={1224}>
            <Row>
              {" "}
              <Sidebar />
            </Row>
          </MediaQuery>
        )}

        <Row className="center">
          {Auth.loggedIn() ? (
            <>
              {" "}
              {}
              <MediaQuery minWidth={1224}>
                <Col md={1}>
                  <Sidebar />
                </Col>
              </MediaQuery>
              <Col md={11}>
                {" "}
                <BrowserRouter>
                  <Routes>
                    <Route path="/matches" element={<MatchesPage />} />
                    <Route path="/*" element={<Swipe />} />
                    <Route path="/swipe" element={<Swipe />} />
                    <Route path="/leetcode" element={<Leetcode />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profiles/:_id" element={<Profile />} />
                    <Route
                      path="/chat"
                      element={
                        <DevChatWrap />
                        // <PubNubProvider client={pubnub}>
                        //   <DevChatWrap />
                        //   {/* <Chat {...{ currentChannel, theme }}>
                        //   <MessageList>
                        //     <TypingIndicator showAsMessage />
                        //   </MessageList>
                        //   <MessageInput typingIndicator />
                        // </Chat> */}
                        // </PubNubProvider>
                      }
                    />
                    {/* <Route
                      path="/chat"
                      element={
                        <PubNubProvider client={pubnub}>
                          <Chat
                          // {...{ currentChannel, theme }}
                          />
                        </PubNubProvider>
                        <SIgnup setPubnubId={setPubnub}


                        


                      }
                    /> */}
                  </Routes>
                </BrowserRouter>
              </Col>
            </>
          ) : (
            <BrowserRouter>
              <Routes>
                <Route path="/profile" element={<Loader />} />
                <Route path="/" element={<LandingPage />} />
                <Route path="/signin" element={<LoginPage />} />
                <Route path="/signup" element={<SignUp />} />
              </Routes>
            </BrowserRouter>
          )}
        </Row>
      </Background>

      <Layout />
    </ApolloProvider>
  );
}

export default App;

//  <Route path="/chat" element={
//                 <PubNubProvider client={pubnub}>
//                   <Chat {...{ currentChannel, theme }}>
//                     <MessageList />
//                     <MessageInput />
//                   </Chat>
//                 </PubNubProvider>} />
