const { gql } = require('apollo-server-express');

const typeDefs = gql`
    scalar Date

    type User {
        _id: ID
        username: String
        email: String
        password: String
        firstName: String
        lastName: String
        age: Int
        city: String
        job: String
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
        user(username: String!): User
        me: User
        messages: [Message]
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(username: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;