import React from 'react';
import './InterestItem.css';

const InterestItem = ({interest}) => {
    return (
        <p className='interestItem'>{interest}</p>
    )
}

export default InterestItem;