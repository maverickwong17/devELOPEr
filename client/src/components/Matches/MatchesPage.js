import React from "react";
import { Row } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import "./Matches.css";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_USER, QUERY_ME } from "../../utils/queries";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

const MatchesPage = () => {
  const { loading: loadme, data: profile } = useQuery(QUERY_ME);

  const { loading: loadall, data: userData } = useQuery(QUERY_ALL_USER);
  const myprofile = profile?.me || {};
  const allUsers = userData || [];
  const userArr = allUsers.users
  if (loadme || loadall) {
    return <Loader />;
  }

  if (!myprofile) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  const myId = myprofile._id
  // console.log("my profile", myprofile);
  // console.log("profile id", myId);
  // console.log("All Users", userArr);

  var connections = myprofile.connections
  var connectionsArr = connections.map(({ _id }) => _id);
  // console.log("my connections:", connections);
  // console.log("my connections id:", connectionsArr);
  var map = function(array){
    var output = []
    for(let i=0; i<array.length; i++){
      // console.log(array[i])
      // console.log(array[i]._id)
      var myArr = connectionsArr.includes(array[i]._id)
      // console.log(array[i].profile.firstName,"in my connections", myArr)
      var userConnectArr = array[i].connections
      // console.log(array[i].profile.firstName, `connections array`, userConnectArr)
      var inUserCon = false
        for(let j=0; j < userConnectArr.length; j++){
          var conID = userConnectArr[j]._id
          // console.log(conID)
          if(myId === conID){
            inUserCon = true
          }
          // console.log(`I am in ${array[i].profile.firstName} connections`, inUserCon)
          // console.log(myArr, inUserCon)
        }
        if(myArr && inUserCon){
          // console.log("match made")
          output.push(array[i])
        }
    }
    console.log(output)
    return output
  }
  var matches = map(userArr)

  return (
    <Row className="grid_matches">
      <div className="matches">
        {matches.map((match, index) => (
          <div
            key={index}
            className="card_match"
            style={{ "--bg-image": `url("${match.profile.images[0]}")`, objectPosition: "50% 50%"  }}
          >
            {/* <div
              className="img_match"
              style={{ "--bg-image": `url("${match.url}")` }}
            ></div> */}
            <h1 style={{background: "black", opacity:".7", width: '100%', display: 'flex', justifyContent: 'space-around', alignItems:"baseline",}}>
             <span style={{fontSize:"24px"}}>
              {match.profile.firstName} {match.profile.lastName} 
              </span> 
            <span style={{textAlign: "right", fontSize: "20px"}}>Age: {match.profile.age}</span>
            </h1>
            <p>
              <Link
              // className="btn btn-primary btn-block btn-squared"
              to={`/profiles/${match._id}`}
            >
              <FaUserCircle size={40} />
            </Link>
              <Link
              // className="btn btn-primary btn-block btn-squared"
              to={`/chat`}
            >
              <AiFillMessage size={40} />
            </Link>
            </p>
          </div>
        ))}
      </div>
    </Row>
  );
};

export default MatchesPage;

/**
 * render cards
 * cards come from matches
 * matches are where current user connections array and other users connections array contain each other
 *    if logged in user connection array contains
 *
 * if I am in other connection array and they are in my array render out card
 *
 * profile button will
 */
