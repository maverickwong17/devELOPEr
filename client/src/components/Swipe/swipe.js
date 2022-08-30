import React, {useState} from 'react';
import TinderCard from 'react-tinder-card';

function cardSwiper () {
    // const get nearby users
    const swiped = (direction, nameToDelete) => {
        setLastDirection(direction)
    } 
    const outOfFrame = (name) => {
        console.log(name)
    }

    return (
        <div>
            <h1>Swipe left for No Right for yes</h1>
            <TinderCard>

            </TinderCard>
        </div>
    )
}