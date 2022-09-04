import React, {useState, useMemo, useRef} from 'react';
import TinderCard from 'react-tinder-card';
// import "./swipeCard/swipe.css";
import { AiFillHeart } from 'react-icons/ai';
import { MdCancel } from 'react-icons/md'; 
import { FaUndo } from 'react-icons/fa';
import InterestButton from "../InterestButton/InterestButton";
import data from "../../data/interestsJson";
import { Row } from 'react-bootstrap';
import { QUERY_All_USER, QUERY_ME } from "../../utils/queries";
import  SwipeCard  from "./swipeCard/swipeCard";
import { useQuery } from '@apollo/client';
import Loader from '../Loader/Loader';


  function Swiper () {
    const {loading, data} = useQuery(QUERY_All_USER)
  
    if (loading) {
      return <Loader />;
  }
    return (
      <Row className='grid_swipe'>
        <h1>React Tinder Card</h1>
      <div className='cards_section'>
      
        <div className='cardContainer'>
         
          <SwipeCard profiles={data.users}/>
         
        </div>
      </div>
      </Row>
    )
  }
  
  export default Swiper