import React from 'react'
import  Swiper  from '../Swipe/swipe'
import { Col, Container, Row } from "react-bootstrap";
import { useQuery } from '@apollo/client';
import Loader from '../Loader/Loader';
import { QUERY_ALL_USER, QUERY_ME } from "../../utils/queries";

const Homepage = () => {

  const {loading, allUserData} = useQuery(QUERY_ALL_USER);

  return (
    <Container>
      <Row>
        <Col>
    {loading ? (
      <Loader />
    ):(
      <Swiper users ={allUserData}/>
    )}
         
        </Col>
      </Row>
      <Row>
          <Col>
            <h3>
              Find your pair programmer now
            </h3>
            <p>Swipe left for no right for yes</p>
          </Col>
      </Row>
    </Container>
  )
}

export default Homepage