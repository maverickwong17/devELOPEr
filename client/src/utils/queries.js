import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
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
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
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
      }
    }
  }
`;

export const QUERY_MESSAGES = gql`
  query messages {
    username
    messageText
    createdAt
  }
`;