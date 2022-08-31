import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      firstName
      lastName
      age
      city
      job
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      firstName
      lastName
      age
      city
      job
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