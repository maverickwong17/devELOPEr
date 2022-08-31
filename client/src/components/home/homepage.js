import React from 'react'
import  Swiper  from '../Swipe/swipe'
import { Col, Container, Row } from "react-bootstrap";

const Homepage = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Swiper/>
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