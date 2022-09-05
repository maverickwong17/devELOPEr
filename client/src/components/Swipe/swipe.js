import React, {useState, useMemo, useRef} from 'react';
import TinderCard from 'react-tinder-card';
// import "./swipe.css";
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
    const { loading: loadme, data: profile } = useQuery(QUERY_ME);
    const myprofile = profile?.me || {};
    if (loading || loadme) {
      return <Loader />;
  }
    if(!myprofile){
      return (
        <h4>
          You need to be logged in to see this. Use the navigation links above to
          sign up or log in!
        </h4>
      );
    }
    
    return (
      <Row className='grid_swipe'>
        <h1>React Tinder Card</h1>
      <div className='cards_section'>
      
        <div className='cardContainer'>
         
          <SwipeCard profiles={data.users} currentUser={myprofile}/>
         
        </div>
      </div>
      </Row>
    )
  }
  
  export default Swiper