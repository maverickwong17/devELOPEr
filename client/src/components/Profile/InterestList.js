import React from 'react';
import InterestItem from './InterestItem';

const InterestList = ({ interests }) => {
    console.log('interests:', interests);

    const renderedList = interests.map((interest) => {
        return <InterestItem key={interest.id} interest={interest} />;
    });

    return <div className="ui relaxed divided list">{renderedList}</div>;
};

export default InterestList;