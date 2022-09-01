const { gql } = require('apollo-server-express');

const typeDefs = gql`
    scalar Date

    input profile {
        firstName: String
        lastName: String
        age: String
        location: String
        job: String
        gender: String
        interest: [String]
        github: String
        linkedin: String
        images: [String]
    }

    type User {
        _id: ID!
        email: String
        password: String
        profile: Profile
        connections: [User]
    }

    type Profile{
        firstName: String
        lastName: String
        age: String
        location: String
        job: String
        gender: String
        interest: [String]
        github: String
        linkedin: String
        images: [String]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Message{
        _id: ID
        username: String
        messageText: String
        createdAt: Date
    }
    
    type Query {
        users: [User]
        user(email: String!): User
        me: User
        messages: [Message]
    }

    type Mutation {
        addUser(email: String!, password: String!, input: profile!): Auth
        login(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;