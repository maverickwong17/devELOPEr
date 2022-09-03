import React, {useState, useMemo, useRef} from 'react';
import TinderCard from 'react-tinder-card';
import { AiFillHeart } from 'react-icons/ai';
import { MdCancel } from 'react-icons/md'; 
import { FaUndo } from 'react-icons/fa';
import InterestButton from "../InterestButton/InterestButton";


const swipeCard = (users) => {
  console.log(users)
  const [currentIndex, setCurrentIndex] = useState(users.length - 1)
  const [lastDirection, setLastDirection] = useState()
 
  const currentIndexRef = useRef(currentIndex)
 


  const childRefs = useMemo(
    () =>
      Array(users.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < users.length - 1

  const canSwipe = currentIndex >= 0


  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

  const outOfFrame = (name, idx) => {

    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()

  }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < users.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  return (
    <>
    {users.map((user, index) => (
        <TinderCard
          ref={childRefs[index]}
          className='swipe'
          key={user.name}
          onSwipe={(dir) => swiped(dir, user.name, index)}
          onCardLeftScreen={() => outOfFrame(user.name, index)}
        >
            <div className="card">
            <img src={user.url} alt={user.name} className="userImage"></img>
            <h3>{user.name}, {user.age}</h3>
            <hr />
            <div className="interest_section">
              {" "}
              {data.slice(0, 4).map((interest) => {
                return (
                  <InterestButton
                    disabled="true"
                    icon={interest.icon}
                    interest={interest.interest}
                  />
                );
              })}
            </div>
            <hr />
          </div>
        </TinderCard>
      ))}
       <div className='buttons'>
          <button onClick={() => swipe('left')}><MdCancel/></button>
          <button onClick={() => goBack()}><FaUndo/></button>
          <button onClick={() => swipe('right')}><AiFillHeart/></button>
        </div>
    </>
  )
}

export default swipeCard