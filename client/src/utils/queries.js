import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($email: String!) {
    user(email: $email) {
      _id
      email
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
      seeking
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