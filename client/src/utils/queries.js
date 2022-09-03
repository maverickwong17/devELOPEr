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
        range
        seeking
        aboutme
      }
    }
  }
`;

export const QUERY_ALL_USER = gql`
  query users{
    users {
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
        range
        seeking
        aboutme
      }
      connections {
        _id
        profile {
          firstName
          lastName
          images
          aboutme
          seeking
          range
          linkedin
          github
          interest
          job
          gender
          location
          age
        }
      }
    }
  }
`;


export const QUERY_ME = gql`
  query me {
    me {
      _id
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
      connections {
        _id
        profile {
          firstName
          lastName
          age
          location
          job
          interest
          gender
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

export const QUERY_MESSAGES = gql`
  query messages {
    username
    messageText
    createdAt
  }
`;