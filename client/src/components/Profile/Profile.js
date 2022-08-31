import React from 'react';
import { useQuery } from '@apollo/client';
import { Navigate, useParams } from "react-router-dom";
import { Col, Row, Container, Button } from "react-bootstrap";
import { QUERY_USER, QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';

import "./Profile.css";

const Profile = () => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <Container className=''>
      <div className='profileContainer'>
        <Row className='profileHeader'>
          <Col>
            <h2 className='h2'>{`${user.firstName}`}</h2>
            <p className='age'>{`${user.age}`}</p>
          </Col>
        </Row>
        <Row className='profileHeader'>
          <Col>
            <p className='job'>{`${user.job}`}</p>
            <p className='city'>{`${user.city}`}</p>
          </Col>
        </Row>
        <Row>
          <Col l={{ order: 1 }} className='containerLeftColumn'>
            <h3 className=''>About Me</h3>
            <p>This is my about me section</p>
            <h3 className=''>Interests</h3>
            {/* map interests */}
            {/* email/linkedin/github icons*/}
          </Col>
          <Col l={{ order: 2 }} className='containerRightColumn'>image gallery
            {/* image gallery */}
          </Col>
        </Row>
      </div>
    </Container>
  )
}

export default Profile;