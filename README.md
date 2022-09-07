# devELOPEr

---
## Description
This app is a dating app tailored to software engineers.

---
### Deployed Link
[Deployed Link](https://dev-eloper.herokuapp.com/)

---
### Badges
![CSS](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white) ![ExpressJS](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![React](	https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white) ![Apollo-GraphQL](https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql) ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) ![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
---
## Table of Contents
- [Description](#description)
- [Deployed Link](#deployed-link)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Tests](#tests)
- [References](#references)
- [Credits](#credits)
- [Questions](#questions)
- [License](#license)

---
## Installation

Clone/Fork repository. To install necessary dependencies, run the following command: `npm i`

To test the features of the application, run the comman `npm run seed` to seed you database with sample data

To run the application when a rebuild is necessary, run the following command: `npm run develop`
---
## Usage

The user can either sign up if the user does not already have an account, or can sign in if they do already have an account. Upon sign in, the user is presented with a daily Leetcode challenge.

The user can pick the profile page button to view their own profile. 

If the user clicks on the matches page button, the user will see user cards for any user they have a mutual connection with.

If the user clicks the home button, the user will be presented with cards to swipe right or left on.

The chat page will allow the user to private message with any user they have a mutual connection with.

---
## Features

```javascript
const renderProfileInfo = () => {
    return (
      <>
        <h3 className="">About Me</h3>
        <p>{user.aboutme}</p>
        <h3 className="">Interests</h3>
        <div>
          <InterestList interests={interests} />
        </div>
        <div style={{ margin: "10px 0 " }}>
          <a
            href={`https://github.com/${user.github}`}
            target="_blank"
            rel="noreferrer noopener"
            className="container profileLinkButtons"
          >
            <AiOutlineGithub size={40} />
          </a>
          <a
            href={`https://www.linkedin.com/in/${user.linkedin}`}
            target="_blank"
            rel="noreferrer noopener"
            className="container profileLinkButtons"
          >
            <AiOutlineLinkedin size={40} />
          </a>
        </div>
      </>
    );
  };

return (
    <Row className="profileContainer">
      <Row className="profileHeader">
        <div>
          <h2 className="h2">
            {`${user.firstName}`} <span>{`${user.age}`}</span>
          </h2>
        </div>
      </Row>
      <Row className="profileHeader2">
        <span className="job">{`${user.job}`}</span>
        <span className="city">{`${user.location}`}</span>
      </Row>
      <Row>
        <MediaQuery minWidth={900}>
          <Col l={{ order: 1 }} className="containerLeftColumn">
            {renderProfileInfo()}
          </Col>
          <Col l={{ order: 2 }} className="containerRightColumn">
            {renderImages()}
          </Col>
        </MediaQuery>
        <MediaQuery maxWidth={900}>
          {renderImages()}
          {renderProfileInfo()}
        </MediaQuery>
      </Row>
    </Row>
  );
```
The renderProfileInfo function returns part of the JSX for the profile page. It pulls key values from the user object to render the relevant data to the page. Below that function is the main profile page JSX, which calls the renderProfileInfo function.

```javascript
const runCodeHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setKey("output");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      body: JSON.stringify({
        language_id: language_id,
        source_code: encode(user_input),
        stdin: encode(""),
      }),
    };
    function encode(str) {
      return btoa(unescape(encodeURIComponent(str || "")));
    }
    const response = await fetch(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*",
      options
    );
```
The 'runCodeHandler' function allows the user inputted source code to be compiled based on the language chosen. The response is then fetched with a POST request and is outputted onto the page with an error or successful output.

```javascript
const myId = myprofile._id;
var connections = myprofile.connections;
var connectionsArr = connections.map(({ _id }) => _id);
var map = function (array) {
  var output = [];
  for (let i = 0; i < array.length; i++) {
    var myArr = connectionsArr.includes(array[i]._id);
    var userConnectArr = array[i].connections;
    var inUserCon = false;
    for (let j = 0; j < userConnectArr.length; j++) {
      var conID = userConnectArr[j]._id;
      if (myId === conID) {
        inUserCon = true;
      }
    }
    if (myArr && inUserCon) {
      output.push(array[i]);
    }
  }
  console.log(output);
  return output;
};
var matches = map(userArr);
```
The "map" function checks the logged in user's connection array and compares it to all user's connection arrays.
It basically just checks if "You" are in my connection array and "I" am in your connection array.
If both of these conditions are true, then push to the output array to use.

```javascript
  const swiped = async (direction, user, index) => {
 
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
    if (direction === "left") {
      return;
    }
    if (direction === "right") {
      try {
        await addConnection({
          variables: { id: user._id },
        });
        console.log("right");
      } catch (error) {
        console.log(JSON.stringify(error));
      }
    }
  };
//
 {users.map((user, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={user.profile.firstName}
            onSwipe={(dir) => swiped(dir, user, index)}
            onCardLeftScreen={() => outOfFrame(user.profile.firstName, index)}
            preventSwipe={["up", "down"]}
          >
```
The code snippet above is showing the swiped function being used on each individual tinder card. The card is generated and given a function to handle onSwipe actions. This function will then take the user direction and index and update the current page and current user based on the direction the card was swiped.





---
## Tests
There are no tests for this app.

---
## References

* [PubNub](https://www.pubnub.com/docs/)
* [React Tinder](https://www.npmjs.com/package/react-tinder-card)
* [Splide](https://splidejs.com/)
* [Nodejs](https://nodejs.org/dist/latest-v16.x/docs/api/)
* [Express](https://www.npmjs.com/package/express)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)
* [Apollo GraphQL](https://www.apollographql.com/)
* [Bcrypt](https://www.npmjs.com/package/bcrypt)
* [JSON Web Token](https://www.npmjs.com/package/jsonwebtoken)
* [JWT-decode](https://www.npmjs.com/package/jwt-decode)
* [React](https://reactjs.org/)
* [Bootstrap](https://getbootstrap.com/)

---
## Credits

devELOPEr is credited to Phillip Besse, Matt Fiaschetti, Kavya Mandla, and Maverick Wong.

devELOPEr logo credited to Luke Hillman [GitHub](https://github.com/lshillman) [LinkedIn](https://www.linkedin.com/in/lshillman/)

---
## Questions
If you have any additional questions, feel free to reach out.
| **Phillip Besse**                                       |  **Matt Fiaschetti**                                       | **Kavya Mandla**                                               | **Maverick Wong**                                              |
| ------------------------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| - [Github](https://github.com/pdbesse)                  | - [Github](https://github.com/fiaschettima)                | - [Github](https://github.com/smandla)                         | - [Github](https://github.com/maverickwong17)                  |
| - [LinkedIn](https://www.linkedin.com/in/phillipbesse/) | - [LinkedIn](https://www.linkedin.com/in/fiaschettimatt/)  | - [LinkedIn](https://www.linkedin.com/in/srikavya-mandla/)     | - [LinkedIn](https://www.linkedin.com/in/maverick-wong/)     

---
## License
devELOPEr is licensed under the [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT).

Copyright 2022 Phillip Besse, Matt Fiaschetti, Kavya Mandla, and Maverick Wong

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
