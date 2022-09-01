import React from 'react';
import { useQuery } from '@apollo/client';
import { Navigate, useParams } from "react-router-dom";
import { Col, Row, Container, Button } from "react-bootstrap";
import { QUERY_USER, QUERY_ME } from '../../utils/queries';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import InterestList from './InterestList';
import Auth from '../../utils/auth';

import "./Profile.css";

const Profile = () => {
  const { email: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { email: userParam },
  });

  const user = data?.me.profile || data?.user.profile || {};
  if (Auth.loggedIn() && Auth.getProfile().data.email === userParam) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }
  console.log(user)
  let interests = user.interest;
  let images = user.images;
  // console.log(interests)

  return (
    <Container className='profileContainer'>
      {/* <div className='profileContainer'> */}
      <Row className='profileHeader'>
        <div>
          <h2 className='h2'>{`${user.firstName}`}</h2>
          <p className='age'>{`${user.age}`}</p>
        </div>
      </Row>
      <Row className='profileHeader2'>
        <p className='job'>{`${user.job}`}</p>
        <p className='city'>{`${user.city}`}</p>
      </Row>
      <Row>
        <Col l={{ order: 1 }} className='containerLeftColumn'>
          <h3 className=''>About Me</h3>
          <p>This is my about me section</p>
          <h3 className=''>Interests</h3>
          <div>
            <InterestList interests={interests} />
          </div>
          {/* email/linkedin/github icons*/}
        </Col>
        <Col l={{ order: 2 }} className='containerRightColumn'>
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          >
            <Masonry>
              {images.map((image, i) => (
                <img
                  key={i}
                  src={image}
                  style={{ width: "100%", display: "block", margin: 2 }}
                  alt=""
                />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </Col>
      </Row>
      {/* </div> */}
    </Container>
  )
}

export default Profile;