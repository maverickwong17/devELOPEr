import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($email: String!, $password: String!, $input: profile!) {
    addUser(email: $email, password: $password, input: $input) {
      token
      user {
        profile {
          firstName
          lastName
          age
          location
          job
          gender
          interest
          github
          linkedin
          images
          range
          seeking
          aboutme
        }
      }
    }
  }
`;

// export const ADD_CONNECTION = gql`
//   mutation addConnection($_id: ID!){
//     addConnection(_id: $_id){
      
//       user{
//         profile{
//           firstName
//           lastName
//         }
//       }
//     }
//   }
// `;
export const ADD_CONNECTION = gql`
mutation addConnection($id: ID!) {
  addConnection(_id: $id) 
  {
    _id
    profile {
      firstName
      lastName
    }
  }

}`;